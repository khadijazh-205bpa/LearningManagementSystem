namespace LearningManagementSystem.API.DTOs.Enrollment
{
     
    public class GetEnrollmentDto
    {
        public int Id { get; set; }

        public string StudentId { get; set; } = null!;

        public int CourseId { get; set; }

        public DateTime EnrolledAt { get; set; }

        public bool IsCompleted { get; set; }
    }
}
