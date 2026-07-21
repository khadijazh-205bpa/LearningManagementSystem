using LearningManagementSystem.API.DTOs.Enrollment;
using LearningManagementSystem.API.DTOs.Lesson;
using LearningManagementSystem.API.Models;

namespace LearningManagementSystem.API.Services.Interfaces
{
    public interface IEnrollmentService
    {
        Task<List<GetEnrollmentDto>> GetAllAsync();
        Task<GetEnrollmentDto> GetByIdAsync(int id);
        Task CreateAsync(CreateEnrollmentDto dto);
        Task UpdateAsync(UpdateEnrollmentDto dto);
        Task DeleteAsync(int id);
    }
}



