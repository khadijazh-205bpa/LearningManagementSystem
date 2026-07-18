using LearningManagementSystem.API.DTOs.Category;
using LearningManagementSystem.API.Repositories.Interfaces;
using LearningManagementSystem.API.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace LearningManagementSystem.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;
      

        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }


        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var categories = await _categoryService.GetAllAsync();

            return Ok(categories);

        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var category = await _categoryService.GetByIdAsync(id);
             
            if (category == null)
            {
                return NotFound();
            }
            return Ok(category);
        }
        [HttpPost]
        public async  Task<IActionResult> Create(CreateCategoryDto dto)
        {
            await _categoryService.CreateAsync(dto);
            return Ok();
        }
        [HttpPut]
        public async Task<IActionResult> Update(UpdateCategoryDto dto)
        {
            await _categoryService.UpdateAsync(dto);
            return Ok();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _categoryService.DeleteAsync(id);
            return Ok();
        }
    }
            

        
}
