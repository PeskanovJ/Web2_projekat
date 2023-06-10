using BLL.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Shared;
using Shared.Common;
using Shared.Constants;
using Shared.DTOs;

namespace Projekat_Backend.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody]LoginDTO LoginDTO)
        {
            if (ModelState.IsValid)
            {
                ResponsePackage<ProfileDTO> response = _userService.LoginUser(LoginDTO);

                if (response.Status == ResponseStatus.OK)
                    return Ok(response.Data);
                else
                {
                    ModelState.AddModelError(String.Empty, response.Message);
                    return Problem("Login");
                }
            }
            else
            {
                ModelState.AddModelError(String.Empty, "Invalid login atempt.");
                return Problem("Login");
            }
        }

        [HttpPost("registerBuyer")]
        public async Task<IActionResult> RegisterBuyer([FromBody]UserDTO UserDTO)
        {
            if (ModelState.IsValid)
            {
                var task = await _userService.RegisterUser(UserDTO,SD.Roles.Buyer);
                if (task.Status == ResponseStatus.OK)
                    return Ok(task.Message);
                else if (task.Status == ResponseStatus.InvalidEmail)
                    ModelState.AddModelError("email", task.Message);
                else if (task.Status == ResponseStatus.InvalidUsername)
                    ModelState.AddModelError("username", task.Message);
                else if (task.Status == ResponseStatus.InternalServerError)
                    ModelState.AddModelError(String.Empty, task.Message);
                else
                    ModelState.AddModelError(String.Empty, task.Message);
            }
            return Problem();

        }

        [HttpPost("registerSeller")]
        public async Task<IActionResult> RegisterSeller([FromBody] UserDTO UserDTO)
        {
            if (ModelState.IsValid)
            {
                var task = await _userService.RegisterUser(UserDTO,SD.Roles.Seller);
                if (task.Status == ResponseStatus.OK)
                    return Ok(task.Message);
                else if (task.Status == ResponseStatus.InvalidEmail)
                    ModelState.AddModelError("email", task.Message);
                else if (task.Status == ResponseStatus.InvalidUsername)
                    ModelState.AddModelError("username", task.Message);
                else if (task.Status == ResponseStatus.InternalServerError)
                    ModelState.AddModelError(String.Empty, task.Message);
                else
                    ModelState.AddModelError(String.Empty, task.Message);
            }
            return Problem();

        }

        [HttpPost("registerAdmin")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> RegisterAdmin(AdminDTO UserDTO)
        {
            if (ModelState.IsValid)
            {
                var task = await _userService.RegisterAdmin(UserDTO);
                if (task.Status == ResponseStatus.OK)
                    return RedirectToAction("Index", "Home");
                else if (task.Status == ResponseStatus.InvalidEmail)
                    ModelState.AddModelError("email", task.Message);
                else
                    ModelState.AddModelError(String.Empty, task.Message);
            }
            return Ok();

        }

        [HttpPost("forgotPassword")]
        public async Task<IActionResult> ForgotPassword(string email)
        {
            var task = await _userService.ForgotPassword(email);
            if (task.Status == ResponseStatus.OK)
                return RedirectToAction("Index", "Home");
            else if (task.Status == ResponseStatus.InvalidEmail)
                ModelState.AddModelError(String.Empty, task.Message);
            else if (task.Status == ResponseStatus.AccountNotActivated)
                ModelState.AddModelError(String.Empty, task.Message);
            else
                ModelState.AddModelError(String.Empty, task.Message);

            return Ok();

        }

        [HttpGet("resetPassword")]
        public async Task<IActionResult> ResetPassword(Guid guid)
        {
            PasswordResetDTO resetDTO = new PasswordResetDTO();
           // resetDTO.PasswordGuid = guid;
            return Ok(resetDTO);

        }
        [HttpPost("resetPassword")]
        public IActionResult ResetPassword(PasswordResetDTO passwordResetDTO)
        {
            if (ModelState.IsValid)
            {
                ResponsePackage<bool> response = _userService.ResetPassword(passwordResetDTO);
                if (response.Status == ResponseStatus.OK)
                {
                    //Notification that password is reset
                    return RedirectToAction("Login");
                }
                else
                {
                    ModelState.AddModelError(String.Empty, response.Message);
                    return NotFound();
                }
            }
            return Ok();
        }

        [HttpGet("profile")]
        public IActionResult Profil(string? email)
        {
            if (email == null)
                return RedirectToAction("Login", "Account");
            ProfileDTO profileDTO = _userService.GetProfile(email).Data;

            return Ok(profileDTO);
        }

        [HttpPost]
        [ActionName("Profil")]
        public IActionResult Profil(ProfileDTO profileDTO, IFormFile? file)
        {
            if (ModelState.IsValid)
            {
                //string wwwRootPath = _hostEnviroment.WebRootPath;
                //if (file != null)
                //{
                //    ResponsePackage<ProfileDTO> profile = _userService.GetProfile(profileDTO.Email);
                //    string fileName = Guid.NewGuid().ToString();
                //    var uploads = Path.Combine(wwwRootPath, @"img\profilePictures");
                //    var extension = Path.GetExtension(file.FileName);

                //    if (profile.Data.ProfileUrl != null)
                //    {
                //        var oldImagePath = Path.Combine(wwwRootPath, profile.Data.ProfileUrl.TrimStart('\\'));
                //        if (System.IO.File.Exists(oldImagePath) && oldImagePath.Substring(oldImagePath.LastIndexOf("profilePictures")) != "profilePictures\\img_avatar.png")
                //        {
                //            System.IO.File.Delete(oldImagePath);
                //        }
                //    }


                    //using (var fileStreams = new FileStream(Path.Combine(uploads, fileName + extension), FileMode.Create))
                    //{
                    //    file.CopyTo(fileStreams);
                    //}
                    //profileDTO.ProfileUrl = @"\img\profilePictures\" + fileName + extension;
                //}

                ResponsePackage<bool> response = _userService.UpdateProfile(profileDTO);
                if (response.Status == ResponseStatus.OK)
                {
                    //notification that password is reset
                    //if (HttpContext.Request.Cookies["LoginCookieFullName"] != null)
                    //{
                    //    var cookieOptions = new CookieOptions();
                    //    cookieOptions.Expires = DateTime.Now.AddDays(365);
                    //    cookieOptions.Path = "/";
                    //    HttpContext.Response.Cookies.Append("LoginCookieFullName", profileDTO.FirstName + " " + profileDTO.LastName, cookieOptions);
                    //    HttpContext.Response.Cookies.Append("LoginCookieEmail", profileDTO.Email, cookieOptions);
                    //    if (file != null)
                    //        HttpContext.Response.Cookies.Append("LoginCookieAvatar", profileDTO.ProfileUrl, cookieOptions);
                    //}
                    //if (HttpContext.Session.Get("FullName") != null)
                    //{
                    //    HttpContext.Session.SetString("FullName", profileDTO.FirstName + " " + profileDTO.LastName);
                    //    HttpContext.Session.SetString("Avatar", profileDTO.ProfileUrl);
                    //}


                    return RedirectToAction("Index", "Home");
                }
                else
                {
                    ModelState.AddModelError(string.Empty, response.Message);
                    return NotFound();
                }
            }
            return Ok();
        }

    }
}
