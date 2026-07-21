using LearningManagementSystem.API.DTOs.Enrollment;

using LearningManagementSystem.API.Models;
using LearningManagementSystem.API.Services.Implementations;
using LearningManagementSystem.API.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace LearningManagementSystem.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EnrollmentController : ControllerBase
    {
        private readonly IEnrollmentService _enrollmentService;
        public EnrollmentController(IEnrollmentService enrollmentService)
        {
            _enrollmentService = enrollmentService;
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var enrollments = await _enrollmentService.GetAllAsync();
            return Ok(enrollments);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var enrollment = await _enrollmentService.GetByIdAsync(id);
            if (enrollment == null)
            {
                return NotFound();
            }
            return Ok(enrollment);
        }
        [HttpPost]
        public async Task<IActionResult> Create(CreateEnrollmentDto dto)
        {
            await _enrollmentService.CreateAsync(dto);
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> Update(UpdateEnrollmentDto dto)
        {
            await _enrollmentService.UpdateAsync(dto);
            return Ok();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _enrollmentService.DeleteAsync(id);
            return Ok();
        }
    }
}

