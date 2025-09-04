using FinanceManagement.Server.Models;
using FinanceManagement.Server.Entities;

namespace FinanceManagement.Server.IServices;

public interface ITransactionService
{
    Task<bool> AddAsync(TransactionRequest request);
    Task<List<TransactionResponse>> GetByUserIdAsync(int userId);
    Task<bool> DeleteById(int id);
    Task<bool> UpdateAsync(TransactionRequest request);
    Task<bool> AddList(List<TransactionRequest> list);
    Task<List<TransactionResponse>> ListAll();
}