using LearningManagementSystem.API.Models.Common;

namespace LearningManagementSystem.API.Models
{
    public class Lesson : BaseEntity
    {
        public string Title { get; set; } = string.Empty;

        public string Content { get; set; } = string.Empty;

        public int Order { get; set; }

        public int CourseId { get; set; }

        public Course Course { get; set; } = null!;
    }
}
