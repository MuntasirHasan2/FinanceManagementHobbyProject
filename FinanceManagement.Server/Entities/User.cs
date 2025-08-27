namespace FinanceManagement.Server.Entities;

public class User
{
    public int Id { get; set; }
    public string? Username { get; set; }
    public string? Email { get; set; }
    public string? Password { get; set; }

    public List<Category> Categories { get; } = new();
    public List<Transaction> Transactions { get; } = new();
    public List<TransactionRecurring> TransactionRecurrings { get; } = new();
}
