using FinanceManagement.Server.DataContext;
using FinanceManagement.Server.IServices;
using FinanceManagement.Server.Entities;


namespace FinanceManagement.Server.Services;

public class UserService : IUserService
{
    private readonly FinanceDBContext _databaseContext; //FinanceDBContext databaseContext
    public UserService()
    {
        _databaseContext = new FinanceDBContext();
    }
    public bool AddUser(string username, string email, string password)
    {
        User user= new User()
        {
            Username = username,
            Email = email,
            Password = password
        };
        _databaseContext.Users.Add(user);
        _databaseContext.SaveChanges();
        return true;
    }
    public bool UpdateUser(int userId, string username)
    {
        return true;
    }
}