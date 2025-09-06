namespace FinanceManagement.Server.Models;

public class TransactionRecurringRequest
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public double Amount { get; set; } = 0;
    public int UserId { get; set; } = 0;

}