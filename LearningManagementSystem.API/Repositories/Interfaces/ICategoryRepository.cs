using LearningManagementSystem.API.Models;

namespace LearningManagementSystem.API.Repositories.Interfaces
{
    public interface  ICategoryRepository
    {
        Task<List<Category>> GetAllAsync();
        Task<Category?> GetByIdAsync(int id);
        Task CreateAsync(Category category);
        void Update(Category category);
        void Delete(Category category);
        Task SaveChangesAsync();
    }
}
