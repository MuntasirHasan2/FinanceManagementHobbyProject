namespace FinanceManagement.Server.IRepositories;

public interface IUserRepository
{
    Task<bool> AddAsync(User user);
    Task<User> GetByIdAsync(int id);
    Task<User> GetByNameAsync(string name);
    Task<User> GetByEmailAsync(string email);
    Task<bool> DeleteAsync(User user);
    Task<bool> UpdateAsync(User oldUser, User updatedUser);
}