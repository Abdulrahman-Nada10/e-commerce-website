using Microsoft.EntityFrameworkCore;
using PaymentsService.Data;
using PaymentsService.Interfaces;
using PaymentsService.Payment_Processors;
using PaymentsService.Repositories;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<PaymentsDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("PaymentsDbConnectionString")));
builder.Services.AddScoped<IPaymentProcessor, PayPalProcessor>();
builder.Services.AddScoped<PaymentRepository, PaymentRepository>();
builder.Services.AddScoped<OrderRepository, OrderRepository>();

// Payment Processors (Strategy Pattern)
builder.Services.AddScoped<PayPalProcessor>();
builder.Services.AddScoped<VodafoneCashProcessor>();
builder.Services.AddScoped<CreditCardProcessor>();

// Default interface binding
builder.Services.AddScoped<IPaymentProcessor, PayPalProcessor>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

 
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
