using FinanceManagement.Server.Services;
using FinanceManagement.Server.IServices;
using FinanceManagement.Server.GlobalException;
using FinanceManagement.Server.Repositories;
using FinanceManagement.Server.IRepositories;

var builder = WebApplication.CreateBuilder(args);
// Add services to the container.

builder.Services.AddControllers(options =>
{
    options.Filters.Add<GlobalExceptionHandler>();
});
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IRepository, UserRepository>();

builder.Services.AddOpenApi();
//builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
builder.Services.AddProblemDetails();

var app = builder.Build();
//app.UseExceptionHandler(_ => {});
app.UseDefaultFiles();
app.MapStaticAssets();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors(builder => builder
       .AllowAnyHeader()
       .AllowAnyMethod()
       .AllowAnyOrigin()
       //.WithOrigins("https://financemanagementbymuntasir-csa4dmeab7akbdbp.southafricanorth-01.azurewebsites.net","https://localhost:50277/","https://localhost:50277/signin","https://localhost:7091")
    );

//.AllowAnyOrigin()
app.UseHttpsRedirection();

app.MapGet("/configuration", (IConfiguration configuration) =>
{
    return configuration.GetValue<string>("CONNECTION_STRING") ?? "No key found";
});

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
