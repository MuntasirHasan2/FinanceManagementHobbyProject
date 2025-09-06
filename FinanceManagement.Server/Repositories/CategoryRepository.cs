using FinanceManagement.Server.Entities;
using FinanceManagement.Server.IRepositories;
using FinanceManagement.Server.DataContext;
using System.Linq;
using Microsoft.EntityFrameworkCore;

public class CategoryRepository : ICategoryRepository
{

    private readonly FinanceDBContext _financeDBContext;

    public CategoryRepository()
    {
        _financeDBContext = new FinanceDBContext();
    }
    public async Task<bool> AddAsync(Category category)
    {
        await _financeDBContext.Categories.AddAsync(category);
        return await _financeDBContext.SaveChangesAsync() > 0;
    }
    public async Task<bool> DeleteAsync(Category category)
    {
        _financeDBContext.Categories.Remove(category);
        return await _financeDBContext.SaveChangesAsync() > 0;
    }
    public async Task<bool> UpdateAsync(Category category)
    {
        _financeDBContext.Categories.Update(category);
        return await _financeDBContext.SaveChangesAsync() > 0;

    }
    public async Task<Category?> GetAsync(int id)
    {
        return await _financeDBContext.Categories.FirstOrDefaultAsync(n => n.Id == id);
    }
    public async Task<List<Category>?> ListByUserIdAsync(int id)
    {
        return await _financeDBContext.Categories.Where(n => n.UserId == id).ToListAsync();
    }
    public async Task<bool> AddList(List<Category> list)
    {
        _financeDBContext.Categories.AddRange(list);
        return await _financeDBContext.SaveChangesAsync() >= list.Count();

    }
    public async Task<List<Category>> ListAll()
    {
        return await _financeDBContext.Categories.ToListAsync();
    }
    public async Task<bool> BulkDelete(List<int> listCategory)
    {
        foreach(var i in listCategory)
        {
            var category = await _financeDBContext.Categories.SingleOrDefaultAsync(c => c.Id == i);
            if(category != null)
                _financeDBContext.Categories.Remove(category);
        }
        return await _financeDBContext.SaveChangesAsync() >= listCategory.Count;
    }
}