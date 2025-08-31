using FinanceManagement.Server.Entities;
using FinanceManagement.Server.IServices;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using Microsoft.Data.SqlClient;
using MySqlConnector;
using BCrypt.Net;
using Microsoft.AspNetCore.Identity;
using FinanceManagement.Server.Models;
using FinanceManagement.Server.CustomException;

namespace FinanceManagement.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController : Controller
{

    private readonly ILogger<UserController> _logger;
    private readonly IUserService _userService;

    public UserController(ILogger<UserController> logger, IUserService userService)
    {
        _logger = logger;
        _userService = userService;
    }

    [HttpGet]
    public IActionResult Get()
    {
        var obj = new User
        {
            Id = 1,
            Username = "zz",
            Email = "zz",
        };
        throw new NotFoundException("testig");
    }


    [Route("LogInAsync")]
    [HttpPost]
    public async Task<IActionResult> LogInAsync(LoginRequest loginData)
    {
        string? email = loginData.email;
        string? password = loginData.password;
        return Ok(await _userService.LogInAsync(email, password));
    }

    [Route("CreateAccountAsync")]
    [HttpPost]
    public async Task<IActionResult> CreateAccountAsync(SignupRequest loginData)
    {
        string username = loginData.Username;
        string email = loginData.Email;
        string password = loginData.Password;
        if (await _userService.AddAsync(username, email, password))
        {
            return Created();
        }
        return BadRequest("An error occured while added the user");
    }
}

