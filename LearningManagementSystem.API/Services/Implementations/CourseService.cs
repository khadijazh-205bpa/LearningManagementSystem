using LearningManagementSystem.API.DTOs.Category;
using LearningManagementSystem.API.DTOs.Course;
using LearningManagementSystem.API.Models;
using LearningManagementSystem.API.Models.Enums;
using LearningManagementSystem.API.Repositories.Implementations;
using LearningManagementSystem.API.Repositories.Interfaces;
using LearningManagementSystem.API.Services.Interfaces;

namespace LearningManagementSystem.API.Services.Implementations
{
    public class CourseService : ICourseService
    {
        private readonly ICourseRepository _courseRepository;


        public CourseService(ICourseRepository courseRepository)
        {
            _courseRepository = courseRepository;

        }
         
        public async Task<List<GetCourseDto>> GetAllAsync()
        {
            var courses = await _courseRepository.GetAllAsync();
            var dtos = courses.Select(c => new GetCourseDto
            {
                Id = c.Id,
                Title = c.Title,
                Description = c.Description,

                Level = c.Level,
                CategoryId = c.CategoryId,
                InstructorId = c.InstructorId

            }).ToList();
            return dtos;
 
        }
        
        public async Task<GetCourseDto?> GetByIdAsync(int id)
        {
            var course = await _courseRepository.GetByIdAsync(id);
            if(course==null)
            {
                return null;
            }
            return new GetCourseDto
            {
                Id = course.Id,
                Title = course.Title,
                Description = course.Description,

                Level = course.Level,
                CategoryId = course.CategoryId,
                InstructorId = course.InstructorId
  
            };
 
        }
         
        public async Task CreateAsync(CreateCourseDto dto)
        {
            Course course = new Course
            {

                Title = dto.Title,
                Description = dto.Description,

                Level = dto.Level,
                CategoryId = dto.CategoryId,
                InstructorId = dto.InstructorId

            };
            await _courseRepository.CreateAsync(course);
            await _courseRepository.SaveChangesAsync();
        }

       
        public async Task UpdateAsync(UpdateCourseDto dto)
        {
            var course = await _courseRepository.GetByIdAsync(dto.Id);
            if (course == null)
            {
                return;
            }
            
            course.Title = dto.Title;
            course.Description = dto.Description;
             course.Level = dto.Level;
            course.CategoryId = dto.CategoryId;
            course.InstructorId = dto.InstructorId;

            _courseRepository.Update(course);
            await _courseRepository.SaveChangesAsync();
 
        }
        

        public async Task DeleteAsync(int id)
        {
            var course = await _courseRepository.GetByIdAsync(id);
            if (course == null)
            {
                return;
            }
           
            _courseRepository.Delete(course);
            await _courseRepository.SaveChangesAsync();

        }

         
    }
}
