namespace FinanceManagement.Server.Models;

public class CategoryRequest
{
    public int Id { get; set; } = 0;
    public string Name { get; set; } = string.Empty;
    public int UserId { get; set; } = 0;
}