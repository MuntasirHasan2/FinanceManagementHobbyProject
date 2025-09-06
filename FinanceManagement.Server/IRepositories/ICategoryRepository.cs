using FinanceManagement.Server.Entities;

namespace FinanceManagement.Server.IRepositories;

public interface ICategoryRepository
{
    Task<bool> AddAsync(Category category);
    Task<bool> DeleteAsync(Category category);
    Task<bool> UpdateAsync(Category category);
    Task<Category?> GetAsync(int id);
    Task<List<Category>?> ListByUserIdAsync(int id);
    Task<bool> AddList(List<Category> list);
    Task<List<Category>> ListAll();
    Task<bool> BulkDelete(List<int> listCategory);
}