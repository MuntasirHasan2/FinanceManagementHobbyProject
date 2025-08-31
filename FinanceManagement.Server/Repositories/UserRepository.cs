using FinanceManagement.Server.IRepositories;
using FinanceManagement.Server.Entities;
using FinanceManagement.Server.DataContext;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace FinanceManagement.Server.Repositories;

public class UserRepository : IUserRepository
{
    private readonly FinanceDBContext _dbContext;

    public UserRepository()
    {
        _dbContext = new FinanceDBContext();
    }

    public async Task<bool> AddAsync(User user)
    {
        await _dbContext.Users.AddAsync(user);
        return await _dbContext.SaveChangesAsync() > 0;
    }
    public async Task<User?> GetByIdAsync(int id)
    {
        return await _dbContext.Users
                         .FirstOrDefaultAsync(n => n.Id == id);
    }
    public async Task<User?> GetByNameAsync(string name)
    {
        return await _dbContext.Users
                         .FirstOrDefaultAsync(n=>n.Username == name);
    }
    public async Task<User?> GetByEmailAsync(string email)
    {
        return await _dbContext.Users.SingleOrDefaultAsync(n => n.Email == email);
    }
    public async Task<bool> DeleteAsync(User user)
    {
        _dbContext.Users.Remove(user);
        return await _dbContext.SaveChangesAsync() > 0;
    }
    public async Task<bool> UpdateAsync(User oldUser, User updatedUser)
    {
        oldUser.Username = string.IsNullOrEmpty(updatedUser.Username) ? oldUser.Username : updatedUser.Username;
        _dbContext.Users.Update(oldUser);
        return await _dbContext.SaveChangesAsync() > 0;
    }

}