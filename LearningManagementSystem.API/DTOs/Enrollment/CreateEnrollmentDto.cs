using System.ComponentModel.DataAnnotations;

namespace LearningManagementSystem.API.DTOs.Enrollment
{
     
    public class CreateEnrollmentDto
    {
        [Required(ErrorMessage = "Student is required.")]
        public string StudentId { get; set; } = null!;

        [Required(ErrorMessage = "Course is required.")]
        [Range(1, int.MaxValue, ErrorMessage = "Please select a valid course.")]
        public int CourseId { get; set; }
    }
}
