using Microsoft.EntityFrameworkCore;
using FinanceManagement.Server.Entities;

namespace FinanceManagement.Server.DataContext;

public class FinanceDBContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Transaction> Transactions { get; set; }
    public DbSet<TransactionRecurring> TransactionRecurrings { get; set; }
    public DbSet<Category> Categories { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseMySQL("*****");
    }
}