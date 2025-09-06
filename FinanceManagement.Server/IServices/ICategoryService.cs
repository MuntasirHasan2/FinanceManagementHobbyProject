using FinanceManagement.Server.Models;
using FinanceManagement.Server.Entities;

namespace FinanceManagement.Server.IServices;

public interface ICategoryService
{
    Task<bool> AddAsync(CategoryRequest request);
    Task<List<CategoryResponse>> GetByUserIdAsync(int userId);
    Task<bool> DeleteById(int id);
    Task<bool> UpdateAsync(CategoryRequest request);
    Task<bool> AddList(List<CategoryRequest> list);
    Task<List<CategoryResponse>> ListAllAsync();
    Task<bool> DeleteBulk(List<int> listCategory);
}