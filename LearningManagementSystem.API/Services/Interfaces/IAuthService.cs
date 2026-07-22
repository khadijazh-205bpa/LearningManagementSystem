using LearningManagementSystem.API.DTOs.Auth;

namespace LearningManagementSystem.API.Services.Interfaces
{
    public interface IAuthService
    {
        Task RegisterAsync(RegisterDto dto);
        Task LoginAsync(LoginDto dto);
    }
}
  