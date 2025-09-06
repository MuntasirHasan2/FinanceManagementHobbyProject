using FinanceManagement.Server.Models;
using FinanceManagement.Server.Entities;

namespace FinanceManagement.Server.Mappers;

public static class CategoryMapper
{
    public static Category ToEntity(this CategoryRequest categoryRequest)
    {
        return new Category()
        {
            Name = categoryRequest.Name,
            UserId = categoryRequest.UserId,
        };
    }

    public static CategoryResponse ToModel(this Category category)
    {
        return new CategoryResponse()
        {
            Id = category.Id,
            Name = category.Name,
        };
    }
}