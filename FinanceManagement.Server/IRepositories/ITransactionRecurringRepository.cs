using FinanceManagement.Server.Entities;

namespace FinanceManagement.Server.IRepositories;

public interface ITransactionRecurringRepository
{
    Task<bool> AddAsync(TransactionRecurring transaction);
    Task<bool> DeleteAsync(TransactionRecurring transaction);
    Task<bool> UpdateAsync(TransactionRecurring transaction);
    Task<TransactionRecurring?> GetAsync(int id);
    Task<List<TransactionRecurring>?> ListByUserIdAsync(int id);
    Task<bool> AddList(List<TransactionRecurring> list);
    Task<List<TransactionRecurring>> ListAll();
    Task<bool> BulkDelete(List<int> listTransactionRecurring);
}