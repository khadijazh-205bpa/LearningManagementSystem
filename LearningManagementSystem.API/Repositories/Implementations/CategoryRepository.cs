using LearningManagementSystem.API.Data;
using LearningManagementSystem.API.Models;
using LearningManagementSystem.API.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace LearningManagementSystem.API.Repositories.Implementations
{
    public class CategoryRepository : ICategoryRepository
    {

        private readonly AppDbContext _db;


        public CategoryRepository(AppDbContext db)
        {
            _db = db;
        }

        public async Task<List<Category>> GetAllAsync()
        {
            return await _db.Categories.ToListAsync();
        }

        public async Task<Category?> GetByIdAsync(int id)
        {
            return await _db.Categories.FirstOrDefaultAsync(x => x.Id == id);
        }
        public async Task CreateAsync(Category category)
        {
            await _db.Categories.AddAsync(category);
        }

        public void Update(Category category)
        {
            _db.Categories.Update(category);
        }

        public void Delete(Category category)
        {
            _db.Categories.Remove(category);
        }
        public async Task SaveChangesAsync()
        {
            await _db.SaveChangesAsync();
        }

       
    }
}
