using LearningManagementSystem.API.DTOs.Auth;
using LearningManagementSystem.API.Models;
using LearningManagementSystem.API.Services.Interfaces;
using LearningManagementSystem.API.Exceptions;
using Microsoft.AspNetCore.Identity;

namespace LearningManagementSystem.API.Services.Implementations
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly ITokenService _tokenService;
        private readonly RoleManager<IdentityRole> _roleManager;


        public AuthService(
            UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager,
        ITokenService tokenService, RoleManager<IdentityRole> roleManager
)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
            _roleManager = roleManager;


        }
        public async Task RegisterAsync(RegisterDto dto)
        {
            AppUser user = new AppUser
            {
                FullName = dto.FullName,
                UserName = dto.UserName,
                Email = dto.Email,
                Role = "Student"
            };

            IdentityResult result = await _userManager.CreateAsync(user, dto.Password);

            if (!result.Succeeded)
            {
                throw new ApiException(
                    string.Join(", ", result.Errors.Select(e => e.Description)), 400
                );
            }
            if (!await _roleManager.RoleExistsAsync("Student"))
            {
                await _roleManager.CreateAsync(new IdentityRole("Student"));
            }

            await _userManager.AddToRoleAsync(user, "Student");
        }

        public async Task<string> LoginAsync(LoginDto dto)
        {
            AppUser? user = await _userManager.FindByEmailAsync(dto.Email);

            if (user == null)
            {
                throw new ApiException("Email or password is incorrect.", 401);
            }

            SignInResult result = await _signInManager.PasswordSignInAsync(
                user.UserName!,
                dto.Password,
                false,
                false
            );

            if (!result.Succeeded)
            {
                throw new ApiException("Email or password is incorrect.", 401);
            }
            string token = _tokenService.GenerateToken(user);

            return token;
        }


    }
}