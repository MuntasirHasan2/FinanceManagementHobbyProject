using FinanceManagement.Server.Models;
using FinanceManagement.Server.Entities;
using FinanceManagement.Server.IServices;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using MySqlConnector;
using System.Collections.Generic;

namespace FinanceManagement.Server.Controllers;



[ApiController]
[Route("[controller]")]
public class CategoryController : Controller
{
    private readonly ICategoryService _categoryService;
    [HttpGet]
    public async Task<IActionResult> Get()
    {
        return Ok(await _categoryService.ListAllAsync());
    }

    [Route("GetCategory")]
    [HttpPost]
    public async Task<IActionResult> GetCategory(int userId)
    {
        return Ok(await _categoryService.GetByUserIdAsync(userId));
    }

    [Route("AddCategory")]
    [HttpPost]
    public async Task<IActionResult> AddCategoryAsync(CategoryRequest request)
    {
        if (await _categoryService.AddAsync(request))
        {
            return Created();
        }
        return BadRequest("An error has occured while adding Category!");
    }

    [Route("RemoveCategory")]
    [HttpPost]
    public async Task<IActionResult> RemoveCategoryAsync(int id)
    {
        return Ok(await _categoryService.DeleteById(id));
    }

    [HttpPost("AddBulk")]
    public async Task<IActionResult> BulkRequestCategory(List<CategoryRequest> list)
    {
        if (await _categoryService.AddList(list))
        {
            return Created();
        }
        return BadRequest("An error has occured while Adding Categories");
    }

    [HttpDelete("DeleteBulk")]
    public async Task<IActionResult> DeleteBulkAsync(List<int> listCategory)
    {
        if (await _categoryService.DeleteBulk(listCategory))
        {
            return NoContent();
        }
        return BadRequest("An error has occurred while deleting categories");
    }

}

