using System.ComponentModel.DataAnnotations;

namespace LearningManagementSystem.API.DTOs.Lesson
{
    public class CreateLessonDto
    {
        [Required(ErrorMessage = "Title is required.")]
        [MinLength(3, ErrorMessage = "Title must be at least 3 characters.")]
        [MaxLength(100, ErrorMessage = "Title cannot exceed 100 characters.")]
        public string Title { get; set; }

        [Required(ErrorMessage = "Content is required.")]
        [MinLength(10, ErrorMessage = "Content must be at least 10 characters.")]
        [MaxLength(5000, ErrorMessage = "Content cannot exceed 5000 characters.")]
        public string Content { get; set; }

        [Range(1, 1000, ErrorMessage = "Order must be between 1 and 1000.")]
        public int Order { get; set; }

        [Required(ErrorMessage = "Course is required.")]
        [Range(1, int.MaxValue, ErrorMessage = "Please select a valid course.")]
        public int CourseId { get; set; }
    }
}
 