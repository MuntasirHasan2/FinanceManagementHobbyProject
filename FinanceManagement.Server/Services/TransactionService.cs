using FinanceManagement.Server.Models;
using FinanceManagement.Server.Entities;
using FinanceManagement.Server.IServices;
using FinanceManagement.Server.IRepositories;
using FinanceManagement.Server.CustomException;
using FinanceManagement.Server.Mappers;

namespace FinanceManagement.Server.Services;

public class TransactionService : ITransactionService
{
    private readonly ITransactionRepository _transactionRepository;
    public TransactionService(ITransactionRepository transactionRepository)
    {
        _transactionRepository = transactionRepository;
    }
    public async Task<bool> AddAsync(TransactionRequest request)
    {
        return await _transactionRepository.AddAsync(request.ToEntity());
    }
    public async Task<List<TransactionResponse>> GetByUserIdAsync(int userId)
    {
        var transactionList = await _transactionRepository.ListByUserIdAsync(userId);
        var transactionResponseList = new List<TransactionResponse>();
        foreach (var transaction in transactionList)
        {
            transactionResponseList.Add(transaction.ToModel());
        }
        return transactionResponseList;
    }
    public async Task<bool> DeleteById(int id)
    {
        var transaction = await _transactionRepository.GetAsync(id);
        if (transaction is null)
        {
            throw new NotFoundException($"Transaction with id {id} does not exist");
        }
        return await _transactionRepository.DeleteAsync(transaction);
    }
    public async Task<bool> UpdateAsync(TransactionRequest request)
    {
        var transaction = await _transactionRepository.GetAsync(request.Id);
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

        return await _transactionRepository.UpdateAsync(transaction);
    }

    public async Task<bool> AddList(List<TransactionRequest> list)
    {
        var transactionList = new List<Transaction>();
        foreach (var transaction in list)
        {
            transactionList.Add(transaction.ToEntity());
        }
        return await _transactionRepository.AddList(transactionList);
    }

    public async Task<List<TransactionResponse>> ListAllAsync()
    {
        var transactionList = await _transactionRepository.ListAll();
        var transactionResponseList = new List<TransactionResponse>();
        foreach (var transaction in transactionList)
        {
            transactionResponseList.Add(transaction.ToModel());
        }
        return transactionResponseList;
    }

    public async Task<bool> DeleteBulk(List<int> listTransaction)
    {
        return await _transactionRepository.BulkDelete(listTransaction);
    }
}