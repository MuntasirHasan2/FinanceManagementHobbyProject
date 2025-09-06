using FinanceManagement.Server.Entities;
using FinanceManagement.Server.IRepositories;
using FinanceManagement.Server.DataContext;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace FinanceManagement.Server.Repositories;

public class TransactionRecurringRepository : ITransactionRecurringRepository
{
    private readonly FinanceDBContext _financeDBContext;
    public TransactionRecurringRepository()
    {
        _financeDBContext = new FinanceDBContext();
    }
    public async Task<bool> AddAsync(TransactionRecurring transaction)
    {
        await _financeDBContext.TransactionRecurrings.AddAsync(transaction);
        return await _financeDBContext.SaveChangesAsync() > 0;
    }
    public async Task<bool> DeleteAsync(TransactionRecurring transaction)
    {
        _financeDBContext.TransactionRecurrings.Remove(transaction);
        return await _financeDBContext.SaveChangesAsync() > 0;
    }
    public async Task<bool> UpdateAsync(TransactionRecurring transaction)
    {
        _financeDBContext.TransactionRecurrings.Update(transaction);
        return await _financeDBContext.SaveChangesAsync() > 0;
    }
    public async Task<TransactionRecurring?> GetAsync(int id)
    {
        return await _financeDBContext.TransactionRecurrings.FirstOrDefaultAsync(n => n.Id == id);
    }
    public async Task<List<TransactionRecurring>?> ListByUserIdAsync(int id)
    {
        return await _financeDBContext.TransactionRecurrings
                                      .Where(n => n.UserId == id)
                                      .ToListAsync();
    }

    public async Task<bool> AddList(List<TransactionRecurring> list)
    {
        _financeDBContext.TransactionRecurrings.AddRange(list);
        return await _financeDBContext.SaveChangesAsync() > 0;
    }
    public async Task<List<TransactionRecurring>> ListAll()
    {
        return await _financeDBContext.TransactionRecurrings.ToListAsync();
    }

    public async Task<bool> BulkDelete(List<int> listTransactionRecurring)
    {
        foreach (var i in listTransactionRecurring)
        {
            var transaction = await _financeDBContext.TransactionRecurrings.FirstOrDefaultAsync(n => n.Id == i);
            if (transaction != null)
                 _financeDBContext.TransactionRecurrings.Remove(transaction);
        }

        return await _financeDBContext.SaveChangesAsync() > 0;
    }
}