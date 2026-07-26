using LearningManagementSystem.API.Models.Enums;

namespace LearningManagementSystem.API.DTOs.Course
{
    public class GetCourseDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public CourseLevel Level { get; set; }
        public int CategoryId { get; set; }
        public string InstructorId { get; set; } = string.Empty;
    }
}
