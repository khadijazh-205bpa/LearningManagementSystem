using LearningManagementSystem.API.DTOs.Category;

namespace LearningManagementSystem.API.Services.Interfaces
{
    public interface ICategoryService
    {
        Task<List<GetCategoryDto>> GetAllAsync();
        Task<GetCategoryDto?> GetByIdAsync(int id);
        Task CreateAsync(CreateCategoryDto dto);
        Task UpdateAsync(UpdateCategoryDto dto);
        Task DeleteAsync(int id);
    }
} 
