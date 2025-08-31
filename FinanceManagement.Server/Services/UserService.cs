using FinanceManagement.Server.DataContext;
using FinanceManagement.Server.IServices;
using FinanceManagement.Server.Entities;
using FinanceManagement.Server.Models;
using FinanceManagement.Server.Repositories;
using FinanceManagement.Server.IRepositories;
using FinanceManagement.Server.CustomException;
using System.Linq;

using BCrypt.Net;
using Microsoft.AspNetCore.Identity;

namespace FinanceManagement.Server.Services;

public class UserService : IUserService
{
    private readonly IUserRepository _repository;
    public UserService(IUserRepository userRepository)
    {
        _repository = userRepository;
    }

    public async Task<LoginResponse> LogInAsync(string email, string password)
    {
        var user = await _repository.GetByEmailAsync(email);
        if (user is null)
        {
            throw new BadRequestException("Email and password does not match");
        }

        string passwordHash = string.IsNullOrEmpty(user.Password) ? "" : user.Password;

        if (BCrypt.Net.BCrypt.Verify(password, passwordHash))
        {
            return new LoginResponse()
            {
                UserId = user.Id,
                Username = string.IsNullOrEmpty(user.Username)? "" : user.Username,
                Message = "done"
            };
        }

        return new LoginResponse()
        {
            UserId = -1,
            Message = "Incorrect"
        };

    }
    public async Task<bool> AddAsync(string username, string email, string password)
    {
        var user = await _repository.GetByEmailAsync(email);
        if (user is not null)
        {
            throw new BadRequestException("Email already exists!");
        }
        string passwordHash = BCrypt.Net.BCrypt.HashPassword(password);

        User newUser = new User()
        {
            Username = username,
            Email = email,
            Password = passwordHash
        };
        return await _repository.AddAsync(newUser);
    }
    public async Task<bool> UpdateAsync(int userId, string username)
    {
        var user = await _repository.GetByIdAsync(userId);
        if (user is null)
        {
            throw new BadRequestException("user does not exist");
        }
        User updatedUser = new User()
        {
            Username = username,
        };
        return await _repository.UpdateAsync(user, updatedUser);
    }

    public async Task<bool> DeleteAsync(int userId)
    {
        var user = await _repository.GetByIdAsync(userId);
        if (user is null)
        {
            throw new BadRequestException("user does not exist");
        }
        return await _repository.DeleteAsync(user);
    }
}