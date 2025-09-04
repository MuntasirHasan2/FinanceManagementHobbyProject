using FinanceManagement.Server.Models;
using FinanceManagement.Server.Entities;
using FinanceManagement.Server.IServices;
using FinanceManagement.Server.IRepositories;
using FinanceManagement.Server.CustomException;
namespace FinanceManagement.Server.Services;

public class TransactionRecurringService : ITransactionRecurringService
{
    private readonly ITransactionRecurringRepository _transactionRecurringRepository;
    public TransactionService(ITransactionRecurringRepository transactionRecurringRepository)
    {
        _transactionRecurringRepository = transactionRecurringRepository;
    }
    public async Task<bool> AddAsync(TransactionRequest request)
    {
        return await _transactionRecurringRepository.AddAsync(request.ToEntity());
    }
    public async Task<List<TransactionRecurringResponse>> GetByUserIdAsync(int userId)
    {
        var transactionList = await _transactionRecurringRepository.ListByUserIdAsync(userId);
        var transactionResponseList = new List<TransactionRecurringResponse>();
        foreach (var transaction in transactionList)
        {
            transactionResponseList.Add(transaction.ToModel());
        }
        return transactionResponseList;
    }
    public async Task<bool> DeleteById(int id)
    {
        var transaction = await _transactionRecurringRepository.GetAsync(id);
        if (transaction is null)
        {
            throw new NotFoundException($"Transaction with id {id} does not exist");
        }
        return await _transactionRecurringRepository.DeleteAsync(transaction);
    }
    public async Task<bool> UpdateAsync(TransactionRequest request)
    {
        var transaction = await _transactionRecurringRepository.GetAsync(request.Id);
        if (transaction is null)
        {
            throw new NotFoundException($"Transaction with id {request.Id} does not exist");
        }
        transaction.Name = string.IsNullOrEmpty(request.Name) ? transaction.Name : request.Name;
        transaction.Description = string.IsNullOrEmpty(request.Description) ? transaction.Description : request.Description;
        transaction.Category = string.IsNullOrEmpty(request.Category) ? transaction.Category : request.Category;
        transaction.Amount = request.Amount == 0 ? transaction.Amount : request.Amount;
        transaction.Year = string.IsNullOrEmpty(request.Year) ? transaction.Year : request.Year;
        transaction.Month = string.IsNullOrEmpty(request.Month) ? transaction.Month : request.Month;

        return await _transactionRecurringRepository.UpdateAsync(transaction);
    }

    public async Task<bool> AddList(List<TransactionRecurringRequest> list)
    {
        var transactionList = new List<Transaction>();
        foreach (var transaction in list)
        {
            transactionList.Add(transaction.ToEntity());
        }
        return await _transactionRecurringRepository.AddList(transactionList);
    }

    public async Task<List<TransactionRecurringResponse>> ListAllAsync()
    {
        var transactionList = await _transactionRecurringRepository.ListAll();
        var transactionResponseList = new List<TransactionRecurringResponse>();
        foreach (var transaction in transactionList)
        {
            transactionResponseList.Add(transaction.ToModel());
        }
        return transactionResponseList;
    }
}