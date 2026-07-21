using System.ComponentModel.DataAnnotations;

namespace LearningManagementSystem.API.DTOs.Enrollment
{
    
    public class UpdateEnrollmentDto
    {
        [Required(ErrorMessage = "Id is required.")]
        [Range(1, int.MaxValue, ErrorMessage = "Invalid enrollment id.")]
        public int Id { get; set; }

        [Required(ErrorMessage = "Student is required.")]
        public string StudentId { get; set; } = null!;

        [Required(ErrorMessage = "Course is required.")]
        [Range(1, int.MaxValue, ErrorMessage = "Please select a valid course.")]
        public int CourseId { get; set; }

        public bool IsCompleted { get; set; }
    }
}
