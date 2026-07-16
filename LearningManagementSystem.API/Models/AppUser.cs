using LearningManagementSystem.API.Models.Common;
using Microsoft.AspNetCore.Identity;

namespace LearningManagementSystem.API.Models
{
    
    public class AppUser : IdentityUser
    {
        public string FullName { get; set; } = null!;

        public string Email { get; set; } = null!;

        public string PasswordHash { get; set; } = null!;

        public string Role { get; set; } = "Student";

        public List<Course> CreatedCourses { get; set; } = [];

        public List<Enrollment> Enrollments { get; set; } = [];
    }
}
