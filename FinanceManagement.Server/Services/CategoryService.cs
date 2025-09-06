using FinanceManagement.Server.Models;
using FinanceManagement.Server.Entities;
using FinanceManagement.Server.IServices;
using FinanceManagement.Server.CustomException;
using FinanceManagement.Server.IRepositories;
using FinanceManagement.Server.Mappers;

namespace FinanceManagement.Server.Services;

public class CategoryService : ICategoryService
{
    private readonly ICategoryRepository _categoryRepository;
    public CategoryService(ICategoryRepository categoryRepository)
    {
        _categoryRepository = categoryRepository;
    }
    public async Task<bool> AddAsync(CategoryRequest request)
    {
        return await _categoryRepository.AddAsync(request.ToEntity());
    }
    public async Task<List<CategoryResponse>> GetByUserIdAsync(int userId)
    {
        var catogories = await _categoryRepository.ListByUserIdAsync(userId);
        var categoryList = new List<CategoryResponse>();
        foreach (var category in catogories)
        {
            categoryList.Add(category.ToModel());
        }
        return categoryList;
    }
    public async Task<bool> DeleteById(int id)
    {
        var category = await _categoryRepository.GetAsync(id);
        if (category == null)
        {
            throw new NotFoundException("Category does not exist!");
        }
        return await _categoryRepository.DeleteAsync(category);
    }
    public async Task<bool> UpdateAsync(CategoryRequest request)
    {
        var category = await _categoryRepository.GetAsync(request.Id);
        if (category == null)
        {
            throw new NotFoundException("Category does not exist!");
        }
        category.Name = string.IsNullOrEmpty(request.Name) ? category.Name : request.Name;
        return await _categoryRepository.UpdateAsync(category);
    }
    public async Task<bool> AddList(List<CategoryRequest> list)
    {
        var categoryList = new List<Category>();
        foreach (var category in list)
        {
            categoryList.Add(category.ToEntity());
        }
        return await _categoryRepository.AddList(categoryList);
    }
    public async Task<List<CategoryResponse>> ListAllAsync()
    {
        var categories = await _categoryRepository.ListAll();
        var categoryList = new List<CategoryResponse>();
        foreach (var category in categories)
        {
            categoryList.Add(category.ToModel());
        }
        return categoryList;
    }
    public async Task<bool> DeleteBulk(List<int> listCategory)
    {
        return await _categoryRepository.BulkDelete(listCategory);
    }
}