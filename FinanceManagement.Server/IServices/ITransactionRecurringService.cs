using FinanceManagement.Server.Models;
using FinanceManagement.Server.Entities;

namespace FinanceManagement.Server.IServices;

public interface ITransactionRecurringService
{
    Task<bool> AddAsync(TransactionRecurringRequest request);
    Task<List<TransactionRecurringResponse>> GetByUserIdAsync(int userId);
    Task<bool> DeleteById(int id);
    Task<bool> UpdateAsync(TransactionRecurringRequest request);
    Task<bool> AddList(List<TransactionRecurringRequest> list);
    Task<List<TransactionRecurringResponse>> ListAllAsync();
    Task<bool> DeleteBulk(List<int> listTransaction);
}