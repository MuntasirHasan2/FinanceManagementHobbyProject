using FinanceManagement.Server.Models;

namespace FinanceManagement.Server.IServices;

public interface IUserService
{
    Task<LoginResponse> LogInAsync(string email, string password);
    Task<bool> AddAsync(string username, string email, string password);
    Task<bool> UpdateAsync(int userId, string username);
    Task<bool> DeleteAsync(int userId);
}