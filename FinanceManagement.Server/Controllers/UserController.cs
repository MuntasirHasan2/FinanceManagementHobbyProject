using FinanceManagement.Server.Entities;
using FinanceManagement.Server.IServices;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using Microsoft.Data.SqlClient;
using MySqlConnector;
using BCrypt.Net;
using Microsoft.AspNetCore.Identity;
using FinanceManagement.Server.Models;


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
        _userService.AddUser("25 Ag added test","new ag 25 email","Test tag 25 password");
        return Ok(obj);
    }


    [Route("LogInAsync")]
    [HttpPost]
    public async Task<IActionResult> LogInAsync(LoginRequest loginData)
    {
        string? email = loginData.email;
        string? password = loginData.password;
        string passwordHash = "";
        string username = "";
        int id = 0;
        var sql = "SELECT * FROM User where email ='" + email + "'";

        HttpClient httpClient = new();
        using HttpResponseMessage response = await httpClient.GetAsync("https://financemanagementbymuntasir-csa4dmeab7akbdbp.southafricanorth-01.azurewebsites.net/configuration/");

        response.EnsureSuccessStatusCode();

        string jsonResponse = await response.Content.ReadAsStringAsync();

        MySqlConnection conn = new MySqlConnection(jsonResponse);

        await conn.OpenAsync();
        using var command = new MySqlCommand(sql, conn);
        MySqlDataReader rdr = await command.ExecuteReaderAsync();
        if (!rdr.Read())
        {
            {
                var objNoEmail = new User
                {
                    Id = id,
                    Username = username,
                    Email = email,
                };
                return Ok(objNoEmail);
            }
        }
        while (rdr.Read())
        {
            id = rdr.GetInt32("id");
            username = rdr.GetString("username");
            passwordHash = rdr.GetString("password");
        }
        rdr.Close();

        if (BCrypt.Net.BCrypt.Verify(password, passwordHash))
        {
            var obj = new LoginResponse
            {
                UserId = id,
                Username = username,
                Message = "done"
            };
            return Ok(obj);
        }
        else
        {
            var obj = new LoginResponse
            {
                UserId = id,
                Message = "Incorrect",
            };
            return Ok(obj);
        }


    }
    [Route("CreateAccountAsync")]
    [HttpPost]
    public async Task<IActionResult> CreateAccountAsync(SignupRequest loginData)
    {

        string username = loginData.Username;
        string email = loginData.Email;
        string password = loginData.Password;

        try
        {

            HttpClient httpClient = new();
            using HttpResponseMessage response = await httpClient.GetAsync("https://financemanagementbymuntasir-csa4dmeab7akbdbp.southafricanorth-01.azurewebsites.net/configuration/");

            response.EnsureSuccessStatusCode();

            string jsonResponse = await response.Content.ReadAsStringAsync();

            MySqlConnection conn = new MySqlConnection(jsonResponse);

            //Checking if email already exist in data base
            var sql = "SELECT * FROM User where email ='" + email + "'";

            await conn.OpenAsync();
            using var commandRead = new MySqlCommand(sql, conn);
            MySqlDataReader rdr = commandRead.ExecuteReader();
            // int numberOfRowAffected = commandRead.ExecuteScalar();

            if (rdr.HasRows)
            {
                var existJSON = new
                {
                    message = "Email already exists",
                };
                return Ok(existJSON);
            }


            //await using var connection = new SqlConnection(connectionString);
            string passwordHash = BCrypt.Net.BCrypt.HashPassword(password);

            sql = "INSERT INTO User (username, email, password) " +
                  "VALUES('" + username + "','" + email + "','" + passwordHash + "')";


            //await conn.OpenAsync();
            conn.Close();
            await conn.OpenAsync();
            using var command = new MySqlCommand(sql, conn);
            await using MySqlDataReader reader = await command.ExecuteReaderAsync();


            int id = (int)command.LastInsertedId;
            var obj = new User
            {
                Id = id,
                Username = username,
                Email = email,
            };
            return Ok(obj);

        }
        catch (SqlException e)
        {
            Console.WriteLine($"SQL Error: {e.Message}");
            return BadRequest(e.ToString());

        }
        catch (Exception e)
        {
            Console.WriteLine(e.ToString());
            return BadRequest(e.ToString());
        }

    }
}

