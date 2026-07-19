using LearningManagementSystem.API.Models.Enums;

namespace LearningManagementSystem.API.DTOs.Course
{
    public class GetCourseDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public CourseLevel Level { get; set; }
        public int CategoryId { get; set; }
        public string InstructorId { get; set; }
    }
}
