using LearningManagementSystem.API.DTOs.Enrollment;

using LearningManagementSystem.API.Models;
using LearningManagementSystem.API.Services.Implementations;
using LearningManagementSystem.API.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
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
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create(CreateEnrollmentDto dto)
        {
            var studentId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(studentId))
            {
                return Unauthorized();
            }
            dto.StudentId = studentId;
            await _enrollmentService.CreateAsync(dto);
            return Ok();
        }
        [Authorize(Roles = "Admin")]
        [HttpPut]
        public async Task<IActionResult> Update(UpdateEnrollmentDto dto)
        {
            await _enrollmentService.UpdateAsync(dto);
            return Ok();
        }
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _enrollmentService.DeleteAsync(id);
            return Ok();
        }
    }
}

