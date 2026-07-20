using LearningManagementSystem.API.DTOs.Category;
using LearningManagementSystem.API.DTOs.Course;
using LearningManagementSystem.API.Services.Implementations;
using LearningManagementSystem.API.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace LearningManagementSystem.API.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
    public class CourseController: ControllerBase
    {

        private readonly ICourseService _courseService;

        public CourseController(ICourseService courseService)
        {
            _courseService = courseService;
        }
  
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var courses = await _courseService.GetAllAsync();
            return Ok(courses);
        }
 

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var course = await _courseService.GetByIdAsync(id);
            if (course == null)
            {
                return NotFound();
            }
            return Ok(course);
        }
        
        [HttpPost]
        public async Task<IActionResult> Create(CreateCourseDto dto)
        {
            await _courseService.CreateAsync(dto);
            return Ok();
        }
        
        [HttpPut]
        public async Task<IActionResult> Update(UpdateCourseDto dto)
        {
            await _courseService.UpdateAsync(dto);
            return Ok();
        }
     
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _courseService.DeleteAsync(id);
            return Ok();
        }




    }
}
