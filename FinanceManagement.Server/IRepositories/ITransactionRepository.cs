using FinanceManagement.Server.Entities;

namespace FinanceManagement.Server.IRepositories;

public interface ITransactionRepository
{
    Task<bool> AddAsync(Transaction transaction);
    Task<bool> DeleteAsync(Transaction transaction);
    Task<bool> UpdateAsync(Transaction transaction);
    Task<Transaction?> GetAsync(int id);
    Task<List<Transaction>?> ListByUserIdAsync(int id);
    Task<bool> AddList(List<Transaction> list);
    Task<List<Transaction>> ListAll();
    Task<bool> BulkDelete(List<int> listTransaction);
}