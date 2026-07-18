using LearningManagementSystem.API.DTOs.Category;
using LearningManagementSystem.API.Models;
using LearningManagementSystem.API.Repositories.Implementations;
using LearningManagementSystem.API.Repositories.Interfaces;
using LearningManagementSystem.API.Services.Interfaces;

namespace LearningManagementSystem.API.Services.Implementations
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;
            public CategoryService(ICategoryRepository categoryRepository) 
        {
            _categoryRepository = categoryRepository;

        }
        public async Task CreateAsync(CreateCategoryDto dto)
        {
            Category category = new Category
            {
                Name = dto.Name
            };

            await _categoryRepository.CreateAsync(category);

            await _categoryRepository.SaveChangesAsync();
        }

        public async Task<List<GetCategoryDto>> GetAllAsync()
        {
            var categories = await _categoryRepository.GetAllAsync();
            var dtos = categories.Select(x => new GetCategoryDto
            {
                Id = x.Id,
                Name = x.Name
            }).ToList();
            return dtos;
        }

        public async Task<GetCategoryDto?> GetByIdAsync(int id)
        {
            var category = await _categoryRepository.GetByIdAsync(id);

            if (category == null)
            {
                return null;
            }

            return new GetCategoryDto
            {
                Id = category.Id,
                Name = category.Name
            };
        }
        public async Task UpdateAsync(UpdateCategoryDto dto)
        {
            var category = await _categoryRepository.GetByIdAsync(dto.Id);

            if (category == null)
            {
                return;
            }

            category.Name = dto.Name;

            _categoryRepository.Update(category);

            await _categoryRepository.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var category = await _categoryRepository.GetByIdAsync(id);

            if (category == null)
            {
                return;
            }

            _categoryRepository.Delete(category);

            await _categoryRepository.SaveChangesAsync();
        }

    }
}
