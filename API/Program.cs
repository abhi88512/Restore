using API.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddDbContext<StoreContext>(options =>{
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddCors();

var app = builder.Build();

app.UseCors(
    options => {
        options.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:3000");
    }
);

app.MapControllers(); // Map controller routes

DbIntializer.InitDb(app); // Initialize the database

app.Run(); // Run the application
