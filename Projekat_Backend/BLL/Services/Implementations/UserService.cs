using AutoMapper;
using BLL.Services.Interfaces;
using DAL.Model;
using DAL.Repository.IRepository;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Shared;
using Shared.Common;
using Shared.Constants;
using Shared.DTOs;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services.Implementations
{
    public class UserService:IUserService
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;
        private readonly IEmailService _emailService;
        private readonly IConfiguration _configuration;
        private readonly IConfigurationSection _secretKey;

        public UserService(IUnitOfWork uow, IEmailService emailService, IConfiguration configuration, IMapper mapper)
        {
            _uow = uow;
            _emailService = emailService;
            _configuration = configuration;
            _mapper = mapper;
            _secretKey = _configuration.GetSection("SecretKey");
        }
        private bool MailExists(string email)
        {
            User u = _uow.User.GetFirstOrDefault(u => u.Email == email);
            if (u != null)
                return true;
            else
                return false;
        }
        private bool UsernameExists(string username)
        {
            User u = _uow.User.GetFirstOrDefault(u => u.UserName == username);
            if (u != null)
                return true;
            else
                return false;
        }

        public async Task<ResponsePackage<bool>> RegisterUser(UserDTO userDTO,SD.Roles Role, string file)
        {
            if (MailExists(userDTO.Email))
            {
                return new ResponsePackage<bool>(false, ResponseStatus.InvalidEmail, "Email already exists");
            }
            if (UsernameExists(userDTO.UserName))
            {
                return new ResponsePackage<bool>(false, ResponseStatus.InvalidUsername, "Username already exists");
            }

            User newUser = _mapper.Map<User>(userDTO);
            
            byte[] salt = PasswordHasher.GenerateSalt();
            newUser.Salt = salt;
            newUser.Password = PasswordHasher.GenerateSaltedHash(Encoding.ASCII.GetBytes(userDTO.Password), salt);
            newUser.ProfileUrl = file;
            string emailContent;
            if (Role == SD.Roles.Buyer)
            {
                newUser.IsVerified = true;
                newUser.Role = SD.Roles.Buyer;
                emailContent = $"<p>Zdravo {newUser.FirstName} {newUser.LastName},</p>";
                emailContent += $"<p>Vas nalog je uspešno napravljen. Zelimo vam srecnu kupovinu.</p>";
            }
            else
            {
                newUser.Role = SD.Roles.Seller;
                newUser.IsVerified = false;
                emailContent = $"<p>Zdravo {newUser.FirstName} {newUser.LastName},</p>";
                emailContent += $"<p>Vas nalog je uspešno napravljen. Molimo vas da sačekate da neko od naših administratora pregleda i odobri vaš profil.</p>";
                emailContent += $"<p>Dobićete email obaveštenja kada nalog bude pregledan.</p>";
            }
            
            try
            {
                var success = await _emailService.SendMailAsync(new EmailData()
                {
                    To = newUser.Email,
                    Content = emailContent,
                    IsContentHtml = true,
                    Subject = "Aktivacija naloga"
                });

                if (success)
                {
                    return new ResponsePackage<bool>(true, ResponseStatus.OK, "User registered succesfully");
                    _uow.User.Add(newUser);
                    _uow.Save();
                }
                else
                    return new ResponsePackage<bool>(false, ResponseStatus.InternalServerError, "There was an error while registering new user");
            }
            catch (Exception ex)
            {
                return new ResponsePackage<bool>(false, ResponseStatus.InternalServerError, ex.Message);
            }
        }
        public ResponsePackage<bool> RegisterAdmin(UserDTO userDTO)
        {
            if (MailExists(userDTO.Email))
            {
                return new ResponsePackage<bool>(false, ResponseStatus.InvalidEmail, "Email already exists");
            }
            if (UsernameExists(userDTO.UserName))
            {
                return new ResponsePackage<bool>(false, ResponseStatus.InvalidUsername, "Username already exists");
            }

            User newUser = _mapper.Map<User>(userDTO);

            byte[] salt = PasswordHasher.GenerateSalt();
            newUser.Salt = salt;
            newUser.Password = PasswordHasher.GenerateSaltedHash(Encoding.ASCII.GetBytes(userDTO.Password), salt);
            newUser.Role = SD.Roles.Admin;
            newUser.IsVerified = true;

            newUser.ProfileUrl = Path.Combine(Directory.GetCurrentDirectory(), "Avatars");
            newUser.ProfileUrl = Path.Combine(newUser.ProfileUrl, "avatar.svg"); 
            try
            {
                _uow.User.Add(newUser);
                _uow.Save();
                return new ResponsePackage<bool>(true, ResponseStatus.OK, "User registered succesfully");
            }
            catch (Exception ex)
            {
                return new ResponsePackage<bool>(false, ResponseStatus.InternalServerError, ex.Message);
            }
        }
        public ResponsePackage<ProfileDTO> LoginUser(LoginDTO loginDTO)
        {
            User u = _uow.User.GetFirstOrDefault(u => u.Email == loginDTO.Email);

            if (u != null)
            {
                if (u.Password.SequenceEqual(PasswordHasher.GenerateSaltedHash(Encoding.ASCII.GetBytes(loginDTO.Password), u.Salt)))
                {
                    List<Claim> claims = new List<Claim>();
                    if (u.Role==SD.Roles.Buyer)
                       claims.Add(new Claim(ClaimTypes.Role, "Buyer"));
                    if (u.Role == SD.Roles.Seller)
                        claims.Add(new Claim(ClaimTypes.Role, "Seller"));
                    if (u.Role == SD.Roles.Admin)
                        claims.Add(new Claim(ClaimTypes.Role, "Admin"));

                    SymmetricSecurityKey secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey.Value));
                    var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                    var tokeOptions = new JwtSecurityToken(
                        issuer: "http://localhost:44327", //url servera koji je izdao token
                        claims: claims, 
                        expires: DateTime.Now.AddMinutes(20),
                        signingCredentials: signinCredentials 
                    );
                    string tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);

                    ProfileDTO p = _mapper.Map<ProfileDTO>(u);
                    p.Token = tokenString;
                    p.Role = u.Role;

                    byte[] imageBytes = System.IO.File.ReadAllBytes(u.ProfileUrl);
                    p.Avatar = Convert.ToBase64String(imageBytes);

                    return new ResponsePackage<ProfileDTO>(p, ResponseStatus.OK, "Login successful");
                }
                else
                    return new ResponsePackage<ProfileDTO>(null, ResponseStatus.NotFound, "Wrong password");
            }
            else
                return new ResponsePackage<ProfileDTO>(null, ResponseStatus.NotFound, "This user does not exist");
        }

        public ResponsePackage<List<ProfileDTO>> GetVerified()
        {
            List<User> notVerified = _uow.User.GetAll(u => !u.IsVerified).ToList();
            if(notVerified.Count == 0)
                return new ResponsePackage<List<ProfileDTO>>(null, ResponseStatus.AllUsersVerified, "All users are verified");
            else
            {
                List<ProfileDTO> response = new List<ProfileDTO>();
                foreach(var elem in notVerified)
                {
                    response.Add(_mapper.Map<ProfileDTO>(elem));
                }
                return new ResponsePackage<List<ProfileDTO>>(response, ResponseStatus.OK);
            }
        }

        public async Task<ResponsePackage<bool>> VerifyUser(VerificationDTO verificationDTO)
        {
            User u = _uow.User.GetFirstOrDefault(u => u.UserName == verificationDTO.UserName);
            if (u == null)
            {
                return new ResponsePackage<bool>(false, ResponseStatus.NotFound);
            }
            u.IsVerified = true;
            string emailContent = $"<p>Zdravo {u.FirstName} {u.LastName},</p>";
            emailContent += $"<p>Vas nalog je verifikovan. Zahvaljujemo vam se na strpljenju.</p>";
            
            try
            {
                _uow.User.Update(u);
                _uow.Save();

                var success = await _emailService.SendMailAsync(new EmailData()
                {
                    To = u.Email,
                    Content = emailContent,
                    IsContentHtml = true,
                    Subject = "Verifikacija naloga"
                });

                if (success)
                    return new ResponsePackage<bool>(true, ResponseStatus.OK, "User verified succesfully");
                else
                    return new ResponsePackage<bool>(false, ResponseStatus.InternalServerError, "There was an error while verifying user");
            }
            catch (Exception ex)
            {
                return new ResponsePackage<bool>(false, ResponseStatus.InternalServerError, ex.Message);
            }
        }

        public async Task<ResponsePackage<bool>> DenyUser(VerificationDTO verificationDTO)
        {
            User u = _uow.User.GetFirstOrDefault(u => u.UserName == verificationDTO.UserName);
            if (u == null)
            {
                return new ResponsePackage<bool>(false, ResponseStatus.NotFound);
            }

            string emailContent = $"<p>Zdravo {u.FirstName} {u.LastName},</p>";
            emailContent += $"<p>Vas nalog je odbijen iz razloga {verificationDTO.Reason}. </p>";

            try
            {
                _uow.User.Remove(u);
                _uow.Save();

                var success = await _emailService.SendMailAsync(new EmailData()
                {
                    To = u.Email,
                    Content = emailContent,
                    IsContentHtml = true,
                    Subject = "Verifikacija naloga"
                });

                if (success)
                    return new ResponsePackage<bool>(true, ResponseStatus.OK, "User denied");
                else
                    return new ResponsePackage<bool>(false, ResponseStatus.InternalServerError, "There was an error");
            }
            catch (Exception ex)
            {
                return new ResponsePackage<bool>(false, ResponseStatus.InternalServerError, ex.Message);
            }
        }



        public ResponsePackage<bool> ResetPassword(PasswordResetDTO passwordResetDTO)
        {
            //User u = _uow.User.GetFirstOrDefault(u => u.PasswordGuid == passwordResetDTO.PasswordGuid);
            //if (u != null)
            //{
            //    //if (u.ActivationGuid != Guid.Empty)
            //    //    u.ActivationGuid = Guid.Empty;
            //    //u.PasswordGuid = Guid.Empty;
            //    //byte[] salt = PasswordHasher.GenerateSalt();
            //    //u.Salt = salt;
            //    //u.Password = PasswordHasher.GenerateSaltedHash(Encoding.ASCII.GetBytes(passwordResetDTO.Password), salt);

            //    //_uow.User.Update(u);
            //    //_uow.Save();
            //    return new ResponsePackage<bool>(true, ResponseStatus.OK, "Password reseted succesfully");
            //}
            //else
            //{
                return new ResponsePackage<bool>(false, ResponseStatus.InvalidPasswordGuid, "Password reset link is not active anymore");
            //}
        }

        public ResponsePackage<ProfileDTO> GetProfile(string email)
        {
            User u = _uow.User.GetFirstOrDefault(u => u.Email == email);
            return new ResponsePackage<ProfileDTO>(_mapper.Map<ProfileDTO>(u), ResponseStatus.OK, "Profile");
        }

        public ResponsePackage<bool> UpdateProfile(ProfileDTO profileDTO)
        {
            //User u = _uow.User.GetFirstOrDefault(u => u.Email == profileDTO.Email);
            //if (profileDTO.ProfileUrl != null)
            //    u.ProfileUrl = profileDTO.ProfileUrl;
            //u.FirstName = profileDTO.FirstName;
            //u.LastName = profileDTO.LastName;
            //u.PhoneNumber = profileDTO.PhoneNumber;

            //_uow.User.Update(u);
            //_uow.Save();

            return new ResponsePackage<bool>(true, ResponseStatus.OK, "Profile changed");
        }

       
    }
}
