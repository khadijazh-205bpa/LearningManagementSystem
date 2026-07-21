using LearningManagementSystem.API.Data;
using LearningManagementSystem.API.Models;
using LearningManagementSystem.API.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace LearningManagementSystem.API.Repositories.Implementations
{
    public class EnrollmentRepository : IEnrollmentRepository
    {
        private readonly AppDbContext _db;

        public EnrollmentRepository(AppDbContext db)
        {
            _db = db;
        }
        public async Task<List<Enrollment>> GetAllAsync()
        {
            return await _db.Enrollments.ToListAsync();
        }

        public async Task<Enrollment?> GetByIdAsync(int id)
        {
            return await _db.Enrollments.FirstOrDefaultAsync(e => e.Id == id);
        }
        public async Task CreateAsync(Enrollment enrollment)
        {
            await _db.Enrollments.AddAsync(enrollment);
        }
        public void Update(Enrollment enrollment)
        {
            _db.Enrollments.Update(enrollment);
        }

        public void Delete(Enrollment enrollment)
        {
            _db.Enrollments.Remove(enrollment);
        }

        public async Task SaveChangesAsync()
        {
            await _db.SaveChangesAsync();
        }
    }
}
 





