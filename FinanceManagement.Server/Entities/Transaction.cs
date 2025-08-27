namespace FinanceManagement.Server.Entities;

public class Transaction
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public double Amount { get; set; } = 0;
    public string Year { get; set; } = string.Empty;
    public string Month { get; set; } = string.Empty;
    public int UserId { get; set; }
    public User User { get; set; }
}

