using LearningManagementSystem.API.Models;

namespace LearningManagementSystem.API.Services.Interfaces
{
    public interface ITokenService
    {
        string GenerateToken(AppUser user);
    }
}
