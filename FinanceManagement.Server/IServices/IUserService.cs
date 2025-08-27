namespace FinanceManagement.Server.IServices;

public interface IUserService
{
    bool AddUser(string username, string email, string password);
    bool UpdateUser(int userId, string username);
}