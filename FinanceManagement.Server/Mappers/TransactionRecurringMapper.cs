using FinanceManagement.Server.Models;
using FinanceManagement.Server.Entities;

namespace FinanceManagement.Server.Mappers;

public static class TransactionRecurringMapper
{
    public static TransactionRecurring ToEntity(this TransactionRecurringRequest transaction)
    {
        return new TransactionRecurring()
        {
            Name = transaction.Name,
            Description = transaction.Description,
            Category = transaction.Category,
            Amount = transaction.Amount,
            UserId = transaction.UserId
        };
    }

    public static TransactionRecurringResponse ToModel(this TransactionRecurring transaction)
    {
        return new TransactionRecurringResponse()
        {
            Name = transaction.Name,
            Description = transaction.Description,
            Category = transaction.Category,
            Amount = transaction.Amount,
        };
    }
}