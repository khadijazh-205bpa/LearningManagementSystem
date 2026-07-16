using LearningManagementSystem.API.Models;
using LearningManagementSystem.API.Models.Common;
using LearningManagementSystem.API.Models.Enums;

namespace LearningManagementSystem.API.Models
{

    public class Course : BaseEntity
    {
        public string Title { get; set; } = null!;

        public string Description { get; set; } = null!;

        
        public CourseLevel Level { get; set; }

        public int CategoryId { get; set; }

        public Category Category { get; set; } = null!;

        public int InstructorId { get; set; }

        public AppUser Instructor { get; set; } = null!;

        public List<Lesson> Lessons { get; set; } = [];

        public List<Enrollment> Enrollments { get; set; } = [];
    }
}
