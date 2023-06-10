using Shared;
using Shared.Common;
using Shared.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services.Interfaces
{
    public interface IUserService
    {
        ResponsePackage<bool> RegisterAdmin(UserDTO userDTO);
        Task<ResponsePackage<bool>> RegisterUser(UserDTO userDTO,SD.Roles Role, string file);
        ResponsePackage<ProfileDTO> LoginUser(LoginDTO loginDTO);
        Task<ResponsePackage<bool>> VerifyUser(VerificationDTO verificationDTO);
        Task<ResponsePackage<bool>> DenyUser(VerificationDTO verificationDTO);
        ResponsePackage<bool> ResetPassword(PasswordResetDTO passwordResetDTO);
        ResponsePackage<ProfileDTO> GetProfile(string email);
        ResponsePackage<bool> UpdateProfile(ProfileDTO profileDTO);
        ResponsePackage<List<ProfileDTO>> GetVerified();
    }
}
