using System.ComponentModel.DataAnnotations;

namespace LearningManagementSystem.API.DTOs.Enrollment
{
     
    public class CreateEnrollmentDto
    {
        public string StudentId { get; set; } = string.Empty;
        [Required(ErrorMessage = "Course is required.")]
        [Range(1, int.MaxValue, ErrorMessage = "Please select a valid course.")]
        public int CourseId { get; set; }
    }
}
