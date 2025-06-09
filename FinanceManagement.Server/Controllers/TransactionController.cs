using DotNetEnv;
using FinanceManagement.Server.Model;
using Microsoft.AspNetCore.Mvc;
using MySqlConnector;
using System.Data;
using System.Net.Http;
using System.Text.Json;

namespace FinanceManagement.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TransactionController : Controller
    {

        [HttpGet]
        public async Task<IActionResult> GetAsync()
        {
            var sql = "SELECT * FROM Transaction;";
            List<Transaction> ListTransaction = new List<Transaction>();

            HttpClient httpClient = new();
            using HttpResponseMessage response = await httpClient.GetAsync("https://hoobyprojectmuntasirfinance-e6edaeapbqdbfeek.southafricanorth-01.azurewebsites.net/configuration/");

            response.EnsureSuccessStatusCode();

            var jsonResponse = await response.Content.ReadAsStringAsync();
            Console.WriteLine($"{jsonResponse}\n");
            MySqlConnection conn = new MySqlConnection(Environment.GetEnvironmentVariable(jsonResponse));

            try
            {
                await conn.OpenAsync();
                using var command = new MySqlCommand(sql, conn);
                MySqlDataReader rdr = command.ExecuteReader();
                while (rdr.Read())
                {
                    int id = rdr.GetInt32("id");
                    int userId = rdr.GetInt32("user_id");
                    string name = rdr.GetString("name");
                    string desction = rdr.GetString("description");
                    string category_name = rdr.GetString("category_name");
                    double amount = rdr.GetDouble("amount");
                    string year = rdr.GetString("year");
                    string month = rdr.GetString("month");
                    string occorance_type = rdr.GetString("occorance_type");
                    string recurring_type = rdr.GetString("recurring_type");

                    var obj_temp = new Transaction
                    {
                        TransactionId = id,
                        UserId = userId,
                        Name = name,
                        Description = desction,
                        Category = category_name,
                        Amount = amount,
                        Year = year,
                        Month = month,
                        recurring_type = recurring_type,
                        occorance_type = occorance_type,
                        Message = "OK"
                    };

                    ListTransaction.Add(obj_temp);

                }
                rdr.Close();
                conn.Close();


                string jsonString = JsonSerializer.Serialize(ListTransaction);
                return Ok(jsonString);
            }
            catch (Exception ex)
            {
                var obj_error = new Category
                {
                    Id = -1,
                    Name = ex.Message,
                    Message = "Error",
                };
                return Ok(obj_error);
            }
        }



        [Route("GetAllTransaction")]
        [HttpGet]
        public async Task<IActionResult> GetAllTransaction(Transaction transaction)
        {

            var sql = "SELECT * FROM Transaction;";
            List<Transaction> ListTransaction = new List<Transaction>();

            HttpClient httpClient = new();
            using HttpResponseMessage response = await httpClient.GetAsync("https://hoobyprojectmuntasirfinance-e6edaeapbqdbfeek.southafricanorth-01.azurewebsites.net/configuration/");

            response.EnsureSuccessStatusCode();

            string jsonResponse = await response.Content.ReadAsStringAsync();

            MySqlConnection conn = new MySqlConnection(jsonResponse);

            try
            {
                await conn.OpenAsync();
                using var command = new MySqlCommand(sql, conn);
                MySqlDataReader rdr = command.ExecuteReader();
                while (rdr.Read())
                {
                    int id = rdr.GetInt32("id");
                    int userId = rdr.GetInt32("user_id");
                    string name = rdr.GetString("name");
                    string desction = rdr.GetString("description");
                    string category_name = rdr.GetString("category_name");
                    double amount = rdr.GetDouble("amount");
                    string year = rdr.GetString("year");
                    string month = rdr.GetString("month");
                    string occorance_type = rdr.GetString("occorance_type");
                    string recurring_type = rdr.GetString("recurring_type");

                    var obj_temp = new Transaction
                    {
                        TransactionId = id,
                        UserId = userId,
                        Name = name,
                        Description = desction,
                        Category = category_name,
                        Amount = amount,
                        Year = year,
                        Month = month,
                        recurring_type = recurring_type,
                        occorance_type= occorance_type,
                        Message = "OK"
                    };

                    ListTransaction.Add(obj_temp);

                }
                rdr.Close();
                conn.Close();


                string jsonString = JsonSerializer.Serialize(ListTransaction);
                return Ok(jsonString);
            }
            catch (Exception ex)
            {
                var obj_error = new Category
                {
                    Id = -1,
                    Name = ex.Message,
                    Message = "Error",
                };
                return Ok(obj_error);
            }

        }




        [Route("GetTransaction")]
        [HttpPost]
        public async Task<IActionResult> GetTransaction(Transaction transaction)
        {

            int id = 0;
            string name = "";
            int? userId = transaction.UserId;
            var sql = "SELECT * FROM Transaction WHERE user_id = " + userId;
            List<Transaction> ListTransaction = new List<Transaction>();

            HttpClient httpClient = new();
            using HttpResponseMessage response = await httpClient.GetAsync("https://hoobyprojectmuntasirfinance-e6edaeapbqdbfeek.southafricanorth-01.azurewebsites.net/configuration/");

            response.EnsureSuccessStatusCode();

            string jsonResponse = await response.Content.ReadAsStringAsync();

            MySqlConnection conn = new MySqlConnection(jsonResponse);

            try
            {
                await conn.OpenAsync();
                using var command = new MySqlCommand(sql, conn);
                MySqlDataReader rdr = command.ExecuteReader();
                while (rdr.Read())
                {
                    id = rdr.GetInt32("id");
                    name = rdr.GetString("name");
                    string desction = rdr.GetString("description");
                    string category_name = rdr.GetString("category_name");
                    double amount = rdr.GetDouble("amount");
                    string year = rdr.GetString("year");
                    string month = rdr.GetString("month");
                    //string occorance_type = rdr.GetString("occorance_type");
                    //string recurring_type = rdr.GetString("recurring_type");

                    var obj_temp = new Transaction
                    {
                        TransactionId = id,
                        UserId = userId,
                        Name = name,
                        Description = desction,
                        Category = category_name,
                        Amount = amount,
                        Year = year,
                        Month = month,
                        //occorance_type= occorance_type,
                        //recurring_type=recurring_type,
                        Message = "OK"
                    };

                    ListTransaction.Add(obj_temp);

                }
                rdr.Close();
                conn.Close();

                var obj = new Category
                {
                    UserId = id,
                    Name = name,
                };

                return Ok(ListTransaction);
            }
            catch (Exception ex)
            {
                var obj_error = new Category
                {
                    Id = id,
                    Message = ex.Message,
                };

                return Ok(obj_error);
            }


        }

        [Route("GetTransactionRecurring")]
        [HttpPost]
        public async Task<IActionResult> GetTransactionRecurring(Transaction transaction)
        {

            int id = 0;
            string name = "";
            int? userId = transaction.UserId;
            var sql = "SELECT * FROM Transaction_Recurring WHERE user_id = " + userId;
            List<Transaction> ListTransaction = new List<Transaction>();

            HttpClient httpClient = new();
            using HttpResponseMessage response = await httpClient.GetAsync("https://hoobyprojectmuntasirfinance-e6edaeapbqdbfeek.southafricanorth-01.azurewebsites.net/configuration/");

            response.EnsureSuccessStatusCode();

            string jsonResponse = await response.Content.ReadAsStringAsync();

            MySqlConnection conn = new MySqlConnection(jsonResponse);

            try
            {
                await conn.OpenAsync();
                using var command = new MySqlCommand(sql, conn);
                MySqlDataReader rdr = command.ExecuteReader();
                while (rdr.Read())
                {
                    id = rdr.GetInt32("id");
                    name = rdr.GetString("name");
                    string desction = rdr.GetString("description");
                    string category_name = rdr.GetString("category_name");
                    double amount = rdr.GetDouble("amount");
                    //string occorance_type = rdr.GetString("occorance_type");
                    //string recurring_type = rdr.GetString("recurring_type");

                    var obj_temp = new Transaction
                    {
                        TransactionId = id,
                        UserId = userId,
                        Name = name,
                        Description = desction,
                        Category = category_name,
                        Amount = amount,
                        //occorance_type= occorance_type,
                        //recurring_type=recurring_type,
                        Message = "OK"
                    };

                    ListTransaction.Add(obj_temp);

                }
                rdr.Close();
                conn.Close();

                var obj = new Category
                {
                    UserId = id,
                    Name = name,
                };

                return Ok(ListTransaction);
            }
            catch (Exception ex)
            {
                var obj_error = new Category
                {
                    Id = id,
                    Message = ex.Message,
                };

                return Ok(obj_error);
            }


        }




        [Route("BulkRequestTransaction")]
        [HttpPost]
        public async Task<IActionResult> BulkRequestTransaction(Transaction transaction)
        {

            string? sql = transaction.BulkSQLString;
            HttpClient httpClient = new();
            using HttpResponseMessage response = await httpClient.GetAsync("https://hoobyprojectmuntasirfinance-e6edaeapbqdbfeek.southafricanorth-01.azurewebsites.net/configuration/");

            response.EnsureSuccessStatusCode();

            string jsonResponse = await response.Content.ReadAsStringAsync();

            MySqlConnection conn = new MySqlConnection(jsonResponse);
            try
            {
                await conn.OpenAsync();
                using var command = new MySqlCommand(sql, conn);
                await using MySqlDataReader reader = await command.ExecuteReaderAsync();


                var Obj = new Transaction
                {

                    Message = "Executed",

                };
                return Ok(Obj);
            }
            catch (Exception ex)
            {
                var Obj = new Category
                {
                    UserId = -1,
                    Name = ex.Message,
                    Message = "Error",

                };
                return Ok(Obj);
            }

        }


    }
}
