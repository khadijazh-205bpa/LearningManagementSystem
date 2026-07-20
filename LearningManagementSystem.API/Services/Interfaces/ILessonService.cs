using LearningManagementSystem.API.DTOs.Lesson;

namespace LearningManagementSystem.API.Services.Interfaces
{
    public interface ILessonService
    {
        Task<List<GetLessonDto>> GetAllAsync();
        Task<GetLessonDto?> GetByIdAsync(int id);
        Task CreateAsync(CreateLessonDto dto);
        Task UpdateAsync(UpdateLessonDto dto);
        Task DeleteAsync(int id);
    }
}
 