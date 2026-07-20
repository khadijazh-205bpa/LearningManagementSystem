using LearningManagementSystem.API.Data;
using LearningManagementSystem.API.Models;
using LearningManagementSystem.API.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace LearningManagementSystem.API.Repositories.Implementations
{
    public class LessonRepository : ILessonRepository
    {
        private readonly AppDbContext _db;
        public LessonRepository(AppDbContext db)
        {
            _db = db;
        }
        public async Task<List<Lesson>> GetAllAsync()
        {
            return await _db.Lessons.ToListAsync();
        }
        public async Task<Lesson?> GetByIdAsync(int id)
        {
            return await _db.Lessons.FirstOrDefaultAsync(l => l.Id == id);
        }
        public async Task CreateAsync(Lesson lesson)
        {
            await _db.Lessons.AddAsync(lesson);
        }
        public void Update(Lesson lesson)
        {
            _db.Lessons.Update(lesson);
        }
        public void Delete(Lesson lesson)
        {
            _db.Lessons.Remove(lesson);
        }
        public async Task SaveChangesAsync()
        {
            await _db.SaveChangesAsync();
        }
    }
}
