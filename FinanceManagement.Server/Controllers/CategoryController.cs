using FinanceManagement.Server.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using MySqlConnector;
using System.Collections.Generic;

namespace FinanceManagement.Server.Controllers
{


    [ApiController]
    [Route("[controller]")]
    public class CategoryController : Controller
    {


        [HttpGet]
        public async Task<IActionResult> Get()
        {
            HttpClient httpClient = new();
            using HttpResponseMessage response = await httpClient.GetAsync("http://localhost:5135/configuration/");

            response.EnsureSuccessStatusCode();

            string jsonResponse = await response.Content.ReadAsStringAsync();

            MySqlConnection conn = new MySqlConnection(jsonResponse);

            int id = 0;
            string name = "";
            var sql = "SELECT * FROM Category";
            Category[] c = new Category[10];
            await conn.OpenAsync();
            using var command = new MySqlCommand(sql, conn);
            MySqlDataReader rdr = command.ExecuteReader();
            int count = 3;
            while (rdr.Read())
            {
                id = rdr.GetInt32("id");
                name = rdr.GetString("name");
                var obj_temp = new Category
                {
                    UserId = id,
                    Name = name,
                };
                c[count]=obj_temp;
                count++;
               
            }
            rdr.Close();
            conn.Close();

            var obj = new Category
            {
                UserId = id,
                Name = name,
            };

            return Ok(c);
        }

        [Route("GetCategory")]
        [HttpPost]
        public async Task<IActionResult> GetCategory(Category category)
        {

            int id = 0;
            string name = "";
            int? userId = category.UserId;
            var sql = "SELECT * FROM Category WHERE user_id = " + userId;
            List<Category> ListCategory = new List<Category>();
            HttpClient httpClient = new();
            using HttpResponseMessage response = await httpClient.GetAsync("http://localhost:5135/configuration/");

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
                    var obj_temp = new Category
                    {
                        Id = id,
                        UserId = userId,
                        Name = name,
                        Message = "OK"
                    };

                    ListCategory.Add(obj_temp);

                }
                rdr.Close();
                conn.Close();

                var obj = new Category
                {
                    UserId = id,
                    Name = name,
                };

                return Ok(ListCategory);
            }
            catch (Exception ex)
            {
                var obj_error = new Category
                {
                    Id = id,
                    Message = "Error",
                };
                return Ok(obj_error);
            }


        }






        [Route("AddCategory")]
        [HttpPost]
        public async Task<IActionResult> AddCategoryAsync(Category category)
        {

            int? userid = category.UserId;
            string? name = category.Name;
            var sql = "INSERT INTO Category  (user_id, name) " +
                    "VALUES('" + userid + "','" + name + "')";

            HttpClient httpClient = new();
            using HttpResponseMessage response = await httpClient.GetAsync("http://localhost:5135/configuration/");

            response.EnsureSuccessStatusCode();

            string jsonResponse = await response.Content.ReadAsStringAsync();

            MySqlConnection conn = new MySqlConnection(jsonResponse);
            try
            {
                await conn.OpenAsync();
                using var command = new MySqlCommand(sql, conn);
                await using MySqlDataReader reader = await command.ExecuteReaderAsync();


                int id = (int)command.LastInsertedId;
                var Obj = new Category
                {
                    Id = id,
                    UserId = userid,
                    Name = name,

                };
                reader.Close();
                conn.Close();

                return Ok(Obj);
            }
            catch (Exception ex)
            {
                var Obj = new Category
                {
                    UserId = -1,
                    Name = ex.Message,

                };
                return Ok(Obj);
            }

        }



        [Route("RemoveCategory")]
        [HttpPost]
        public async Task<IActionResult> RemoveCategoryAsync(Category category)
        {

            int? category_id = category.Id;
            int? userid = category.UserId;
            string temp_id = category_id.ToString();
            string name = category.Name;
            var sql = "DELETE FROM Category where id =  " + temp_id +" AND user_id = " + userid;
            HttpClient httpClient = new();
            using HttpResponseMessage response = await httpClient.GetAsync("http://localhost:5135/configuration/");

            response.EnsureSuccessStatusCode();

            string jsonResponse = await response.Content.ReadAsStringAsync();

            MySqlConnection conn = new MySqlConnection(jsonResponse);

            try
            {
                await conn.OpenAsync();
                using var command = new MySqlCommand(sql, conn);
                await using MySqlDataReader reader = await command.ExecuteReaderAsync();


                var Obj = new Category
                {
                    Id = category_id,
                    UserId = userid,
                    Name = name,
                    Message = "Deleted",

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

        [Route("BulkRequestCategory")]
        [HttpPost]
        public async Task<IActionResult> BulkRequestCategory(Category category)
        {

            string sql = category.BulkSQLString;
            HttpClient httpClient = new();
            using HttpResponseMessage response = await httpClient.GetAsync("http://localhost:5135/configuration/");

            response.EnsureSuccessStatusCode();

            string jsonResponse = await response.Content.ReadAsStringAsync();

            MySqlConnection conn = new MySqlConnection(jsonResponse);
            try
            {
                await conn.OpenAsync();
                using var command = new MySqlCommand(sql, conn);
                await using MySqlDataReader reader = await command.ExecuteReaderAsync();


                var Obj = new Category
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
