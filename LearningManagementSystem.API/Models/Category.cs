using LearningManagementSystem.API.Models.Common;

namespace LearningManagementSystem.API.Models
{
    public class Category : BaseEntity
    {
        public string Name { get; set; } = string.Empty;
        public List<Course> Courses { get; set; } = [];
    }
}
