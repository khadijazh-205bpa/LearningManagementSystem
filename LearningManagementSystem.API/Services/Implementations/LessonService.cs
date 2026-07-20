using LearningManagementSystem.API.DTOs.Course;
using LearningManagementSystem.API.DTOs.Lesson;
using LearningManagementSystem.API.Models;
using LearningManagementSystem.API.Repositories.Implementations;
using LearningManagementSystem.API.Repositories.Interfaces;
using LearningManagementSystem.API.Services.Interfaces;

namespace LearningManagementSystem.API.Services.Implementations
{
    public class LessonService : ILessonService
    {
        private readonly ILessonRepository _lessonRepository;

        public LessonService(ILessonRepository lessonRepository)
        {
            _lessonRepository = lessonRepository;
        }
        public async Task<List<GetLessonDto>> GetAllAsync()
        {
            var lessons = await _lessonRepository.GetAllAsync();
            var dtos = lessons.Select(l => new GetLessonDto
            {
                Id = l.Id,
                Title = l.Title,
                Content = l.Content,
                Order = l.Order,
                CourseId = l.CourseId
            }).ToList();
            return dtos;
        }
        public async Task<GetLessonDto?> GetByIdAsync(int id)
        {
            var lesson = await _lessonRepository.GetByIdAsync(id);
            if (lesson == null)
            {
                return null;
            }
            return new GetLessonDto
            {
                Id = lesson.Id,
                Title = lesson.Title,
                Content = lesson.Content,
                Order = lesson.Order,
                CourseId = lesson.CourseId

            };
        }
        public async Task CreateAsync(CreateLessonDto dto)
        {
            Lesson lesson = new Lesson
            {
                Title = dto.Title,
                Content = dto.Content,
                Order = dto.Order,
                CourseId = dto.CourseId
            };
            await _lessonRepository.CreateAsync(lesson);
            await _lessonRepository.SaveChangesAsync();
        }
        public async Task UpdateAsync(UpdateLessonDto dto)
        {
            var lesson = await _lessonRepository.GetByIdAsync(dto.Id);
            if (lesson == null)
            {
                return;
            }
            lesson.Title = dto.Title;
            lesson.Content = dto.Content;
            lesson.Order = dto.Order;
            lesson.CourseId = dto.CourseId;


            _lessonRepository.Update(lesson);
            await _lessonRepository.SaveChangesAsync();
        }
        public async Task DeleteAsync(int id)
        {
            var lesson = await _lessonRepository.GetByIdAsync(id);
            if (lesson == null)
            {
                return;
            }

            _lessonRepository.Delete(lesson);
            await _lessonRepository.SaveChangesAsync();
        }
    }
}






































    

