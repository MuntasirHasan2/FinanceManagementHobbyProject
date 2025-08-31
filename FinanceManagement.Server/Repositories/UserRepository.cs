using FinanceManagement.Server.IRepositories;

public class UserRepository : IUserRepository
{
    private readonly FinanceDBContext _dbContext;

    public UserRepository()
    {
        _dbContext = new FinanceDBContext();
    }

    public async Task<bool> AddAsync(User user)
    {
        await _dbContext.Users.Add(user);
        return await _dbContext.SaveChangesAsync() > 0;
    }
    public async Task<User> GetByIdAsync(int id)
    {
        return _dbContext.Users
                         .SingleOrDefaultAsync(id);
    }
    public async Task<User> GetByNameAsync(string name)
    {
        return _dbContext.Users
                         .SingleOrDefaultAsync(name);
    }
    public async Task<User> GetByEmailAsync(string email)
    {
        return _dbContext.Users.SingleOrDefaultAsync(n => n.Email == email);
    }
    public async Task<bool> DeleteAsync(User user)
    {
        await _dbContext.Users.Remove(user);
        return _dbContext.SaveChangesAsync() > 0;
    }
    public async Task<bool> UpdateAsync(User oldUser, User updatedUser)
    {
        oldUser.Username = string.IsNullOrEmpty(updatedUser) ? oldUser.Username : updatedUser.Username;
        await _dbContext.Users.Update(oldUser);
        return await _dbContext.SaveChangesAsync() > 0;
    }

}