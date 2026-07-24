using LearningManagementSystem.API.Models.Enums;
using System.ComponentModel.DataAnnotations;

namespace LearningManagementSystem.API.DTOs.Course
{
    public class UpdateCourseDto
    {
        [Range(1, int.MaxValue, ErrorMessage = "Invalid course ID.")]
        public int Id { get; set; }


        [Required(ErrorMessage = "Title is required.")]
        [MinLength(2, ErrorMessage = "Title must be at least 2 characters long.")]
        [MaxLength(100, ErrorMessage = "Title cannot exceed 100 characters.")]
        public string Title { get; set; }


        [Required(ErrorMessage = "Description is required.")]
        [MinLength(10, ErrorMessage = "Description must be at least 10 characters long.")]
        [MaxLength(500, ErrorMessage = "Description cannot exceed 500 characters.")]
        public string Description { get; set; }


        [Required(ErrorMessage = "Course level is required.")]
        public CourseLevel Level { get; set; }


        [Range(1, int.MaxValue, ErrorMessage = "Please select a valid category.")]
        public int CategoryId { get; set; }

        [Required(ErrorMessage = "Instructor is required.")]
        public string InstructorId { get; set; }
    }
}
