namespace FinanceManagement.Server.Model
{
    public class Transaction
    {
        public int? TransactionId { get; set; }
        public int? UserId { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? Category { get; set; }
        public double? Amount { get; set; }
        public string? Year { get; set; }
        public string? Month { get; set; }

        public string? occorance_type { get; set; }
        public string? recurring_type { get; set; }
        public string? BulkSQLString { get; set; }
        public string? Message { get; set; }
    }
}
