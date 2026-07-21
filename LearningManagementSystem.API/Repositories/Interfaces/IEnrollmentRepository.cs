using LearningManagementSystem.API.Models;

namespace LearningManagementSystem.API.Repositories.Interfaces
{
    public interface IEnrollmentRepository
    {
        Task<List<Enrollment>> GetAllAsync();
        Task<Enrollment?> GetByIdAsync(int id);
        Task CreateAsync(Enrollment enrollment);
        void Delete(Enrollment enrollment);
        void Update(Enrollment enrollment);
        Task SaveChangesAsync();
    }

}