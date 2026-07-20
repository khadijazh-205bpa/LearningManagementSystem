using LearningManagementSystem.API.DTOs.Course;

namespace LearningManagementSystem.API.Services.Interfaces
{
    public interface ICourseService
    {
        Task<List<GetCourseDto>> GetAllAsync();
        Task<GetCourseDto?> GetByIdAsync(int id);
        Task CreateAsync(CreateCourseDto dto);
        Task UpdateAsync (UpdateCourseDto dto);
        Task DeleteAsync (int id);
    }
}
