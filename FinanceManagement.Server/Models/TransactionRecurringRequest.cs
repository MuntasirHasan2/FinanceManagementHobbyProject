namespace FinanceManagement.Server.Models;

public class TransactionRecurringRequest
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public double Amount { get; set; } = 0;
}