using LearningManagementSystem.API.DTOs.Enrollment;
 
using LearningManagementSystem.API.Models;
using LearningManagementSystem.API.Repositories.Implementations;
using LearningManagementSystem.API.Repositories.Interfaces;
using LearningManagementSystem.API.Services.Interfaces;

namespace LearningManagementSystem.API.Services.Implementations
{
    public class EnrollmentService : IEnrollmentService
    {
        private readonly IEnrollmentRepository _enrollmentRepository;
        public EnrollmentService(IEnrollmentRepository enrollmentRepository)
        {
            _enrollmentRepository = enrollmentRepository;
        }
        public async Task<List<GetEnrollmentDto>> GetAllAsync()
        {
            var enrollments = await _enrollmentRepository.GetAllAsync();
            var dtos = enrollments.Select(e => new GetEnrollmentDto
            {
                Id = e.Id,
                StudentId = e.StudentId,
                CourseId = e.CourseId,
                EnrolledAt = e.EnrolledAt,
                IsCompleted = e.IsCompleted
            }).ToList();
            return dtos;
        }
        public async Task<GetEnrollmentDto?> GetByIdAsync(int id)
        {
            var enrollment = await _enrollmentRepository.GetByIdAsync(id);
            if (enrollment == null)
            {
                return null;
            }
            return new GetEnrollmentDto
            {
                Id = enrollment.Id,
                StudentId = enrollment.StudentId,
                CourseId = enrollment.CourseId,
                EnrolledAt = enrollment.EnrolledAt,
                IsCompleted = enrollment.IsCompleted
            };
        }
        public async Task CreateAsync(CreateEnrollmentDto dto)
        {
            Enrollment enrollment = new Enrollment
            {
                StudentId = dto.StudentId,
                CourseId = dto.CourseId
            };
            await _enrollmentRepository.CreateAsync(enrollment);
            await _enrollmentRepository.SaveChangesAsync();
        }
        public async Task UpdateAsync(UpdateEnrollmentDto dto)
        {
            var enrollment = await _enrollmentRepository.GetByIdAsync(dto.Id);
            if (enrollment == null)
            {
                return;
            }
            enrollment.IsCompleted = dto.IsCompleted;
            enrollment.StudentId = dto.StudentId;
            enrollment.CourseId = dto.CourseId;


            _enrollmentRepository.Update(enrollment);
            await _enrollmentRepository.SaveChangesAsync();
        }
        public async Task DeleteAsync(int id)
        {
            var enrollment = await _enrollmentRepository.GetByIdAsync(id);
            if (enrollment == null)
            {
                return;
            }

            _enrollmentRepository.Delete(enrollment);
            await _enrollmentRepository.SaveChangesAsync();
        }

        
    }
}



        