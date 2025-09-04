using FinanceManagement.Server.Models;
using FinanceManagement.Server.Entities;

namespace FinanceManagement.Server.Models;

public static class TransactionMapper
{
    public static Transaction ToEntity(this TransactionRequest transaction)
    {
        return new Transaction()
        {
            Name = transaction.Name,
            Description = transaction.Description,
            Category = transaction.Category,
            Amount = transaction.Amount,
            Year = transaction.Year,
            Month = transaction.Month,
            UserId = transaction.UserId
        };
    }

    public static Transaction ToModel(this Transaction transaction)
    {
        return new TransactionResponse()
        {
            Name = transaction.Name,
            Description = transaction.Description,
            Category = transaction.Category,
            Amount = transaction.Amount,
            Year = transaction.Year,
            Month = transaction.Month,
        };
    }
}