using Microsoft.EntityFrameworkCore;
using PhoneBook.API.Data;
using PhoneBook.API.Repositories.Implementation;
using PhoneBook.API.Repositories.Interface;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<ApplicationDbContext>(
    options => {
        options.UseSqlServer(builder.Configuration.GetConnectionString("PhonebookConnectionString"));
    }
);

builder.Services.AddScoped<IContactRepository, ContactRepository>();
builder.Services.AddSingleton<IUtilityService, UtilityService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(options =>
{
    options.AllowAnyHeader();
    options.AllowAnyOrigin();
    options.AllowAnyMethod();
});

app.UseAuthorization();

app.MapControllers();

app.Run();
