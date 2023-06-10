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
        Task<ResponsePackage<bool>> RegisterAdmin(AdminDTO userDTO);
        Task<ResponsePackage<bool>> RegisterUser(UserDTO userDTO,SD.Roles Role);
        ResponsePackage<ProfileDTO> LoginUser(LoginDTO loginDTO);
        ResponsePackage<bool> VerifyUser(long id);
        Task<ResponsePackage<bool>> ForgotPassword(string email);
        ResponsePackage<bool> ResetPassword(PasswordResetDTO passwordResetDTO);
        ResponsePackage<ProfileDTO> GetProfile(string email);
        ResponsePackage<bool> UpdateProfile(ProfileDTO profileDTO);
    }
}
