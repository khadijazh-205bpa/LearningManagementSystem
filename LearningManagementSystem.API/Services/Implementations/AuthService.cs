using LearningManagementSystem.API.DTOs.Auth;
using LearningManagementSystem.API.Models;
using LearningManagementSystem.API.Services.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace LearningManagementSystem.API.Services.Implementations
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;

        public AuthService(
            UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }
        public async Task RegisterAsync(RegisterDto dto)
        {
            AppUser user = new AppUser
            {
                FullName = dto.FullName,
                UserName = dto.UserName,
                Email = dto.Email
            };

            IdentityResult result = await _userManager.CreateAsync(user, dto.Password);

            if (!result.Succeeded)
            {
                throw new Exception(
                    string.Join(", ", result.Errors.Select(e => e.Description))
                );
            }
        }

        public async Task LoginAsync(LoginDto dto)
        {
            AppUser? user = await _userManager.FindByEmailAsync(dto.Email);

            if (user == null)
            {
                throw new Exception("Email or password is incorrect.");
            }

            SignInResult result = await _signInManager.PasswordSignInAsync(
                user.UserName!,
                dto.Password,
                false,
                false
            );

            if (!result.Succeeded)
            {
                throw new Exception("Email or password is incorrect.");
            }
        }
    }
}