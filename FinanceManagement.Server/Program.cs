var builder = WebApplication.CreateBuilder(args);
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
var app = builder.Build();

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
       .WithOrigins("https://hoobyprojectmuntasirfinance-e6edaeapbqdbfeek.southafricanorth-01.azurewebsites.net")
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
