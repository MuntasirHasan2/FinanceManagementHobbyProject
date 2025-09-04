using FinanceManagement.Server.Entities;
using FinanceManagement.Server.IRepositories;
using FinanceManagement.Server.DataContext;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace FinanceManagement.Server.Repositories;

public class TransactionRepository : ITransactionRepository
{
    private readonly FinanceDBContext _financeDBContext;
    public TransactionRepository()
    {
        _financeDBContext = new FinanceDBContext();
    }
    public async Task<bool> AddAsync(Transaction transaction)
    {
        await _financeDBContext.Transactions.AddAsync(transaction);
        return await _financeDBContext.SaveChangesAsync() > 0;
    }
    public async Task<bool> DeleteAsync(Transaction transaction)
    {
        _financeDBContext.Transactions.Remove(transaction);
        return await _financeDBContext.SaveChangesAsync() > 0;
    }
    public async Task<bool> UpdateAsync(Transaction transaction)
    {
        _financeDBContext.Transactions.Update(transaction);
        return await _financeDBContext.SaveChangesAsync() > 0;
    }
    public async Task<Transaction?> GetAsync(int id)
    {
        return await _financeDBContext.Transactions.FirstOrDefaultAsync(n => n.Id == id);
    }
    public async Task<List<Transaction>?> ListByUserIdAsync(int id)
    {
        return await _financeDBContext.Transactions
                                      .Where(n => n.UserId == id)
                                      .ToListAsync();
    }

    public async Task<bool> AddList(List<Transaction> list)
    {
        _financeDBContext.Transactions.AddRange(list);
        return await _financeDBContext.SaveChangesAsync() > 0;
    }
}