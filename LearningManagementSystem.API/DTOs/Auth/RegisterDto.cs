using System.ComponentModel.DataAnnotations;

namespace LearningManagementSystem.API.DTOs.Auth
{
    public class RegisterDto
    {
        [Required(ErrorMessage = "Full name is required.")]
        [MinLength(3, ErrorMessage = "Full name must be at least 3 characters.")]
        [MaxLength(70, ErrorMessage = "Full name cannot exceed 70 characters.")]
        public string FullName { get; set; } = null!;
        [Required(ErrorMessage = "Username is required.")]
        [MinLength(3, ErrorMessage = "Username must be at least 3 characters.")]
        [MaxLength(50, ErrorMessage = "Username cannot exceed 50 characters.")]
        public string UserName { get; set; } = null!;

        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Please enter a valid email address.")]
        public string Email { get; set; } = null!;

        [Required(ErrorMessage = "Password is required.")]
        [MinLength(8, ErrorMessage = "Password must be at least 8 characters.")]
        public string Password { get; set; } = null!;

        [Required(ErrorMessage = "Please confirm your password.")]
        [Compare("Password", ErrorMessage = "Passwords do not match.")]
        public string ConfirmPassword { get; set; } = null!;
    }
}
