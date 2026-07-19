using LearningManagementSystem.API.Data;
using LearningManagementSystem.API.Models;
using LearningManagementSystem.API.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace LearningManagementSystem.API.Repositories.Implementations
{
    public class CourseRepository:ICourseRepository
    {
        private readonly AppDbContext _db;

        public CourseRepository(AppDbContext db)
        {
            _db = db;
        }

       

       
        public async Task<List<Course>> GetAllAsync()
        {
            return await _db.Courses.ToListAsync();
        }

        public  async  Task<Course?> GetByIdAsync(int id)
        {
            return await _db.Courses.FirstOrDefaultAsync(c => c.Id == id);
        }
        public async Task CreateAsync(Course course)
        {
             await _db.Courses.AddAsync(course);
        }

       
        public void Update(Course course)
        {
            _db.Courses.Update(course);
        }
        public void Delete(Course course)
        {
            _db.Courses.Remove(course);
        }
        public async Task SaveChangesAsync()
        {
            await _db.SaveChangesAsync();
        }


    }
}
 