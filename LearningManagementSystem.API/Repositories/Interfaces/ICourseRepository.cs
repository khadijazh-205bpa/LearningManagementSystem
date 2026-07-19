using LearningManagementSystem.API.Models;

namespace LearningManagementSystem.API.Repositories.Interfaces
{
    public interface ICourseRepository
    {
        Task<List<Course>> GetAllAsync();
        Task<Course?> GetByIdAsync(int id);
        Task CreateAsync(Course course);
        void Delete(Course course);
        void Update(Course course);
        Task SaveChangesAsync();
    }
}
