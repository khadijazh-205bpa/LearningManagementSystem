using LearningManagementSystem.API.Models.Common;

namespace LearningManagementSystem.API.Models
{
    public class Enrollment : BaseEntity
    {
        public int StudentId { get; set; }

        public AppUser Student { get; set; } = null!;

        public int CourseId { get; set; }

        public Course Course { get; set; } = null!;

        public DateTime EnrolledAt { get; set; } = DateTime.UtcNow;

        public bool IsCompleted { get; set; } = false;
    }
}
