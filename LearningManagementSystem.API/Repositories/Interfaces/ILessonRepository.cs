using LearningManagementSystem.API.Models;

namespace LearningManagementSystem.API.Repositories.Interfaces
{
    public interface  ILessonRepository
    {
        Task<List<Lesson>> GetAllAsync();
        Task<Lesson?> GetByIdAsync(int id);
        Task CreateAsync(Lesson lesson);
        void Delete(Lesson lesson);
        void Update(Lesson lesson);
        Task SaveChangesAsync();
    }
}
 