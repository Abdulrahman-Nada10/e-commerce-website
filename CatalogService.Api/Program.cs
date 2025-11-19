using CatalogService.Api.Services;
using CatalogService.Api.Services.Brands;
using CatalogService.Api.Services.Categories;
using CatalogService.Api.Services.Products;
using CatalogService.Api.Services.RelatedProducts;
using CatalogService.Api.Services.Translations;
using CatalogService.Api.Services.Wishlists;
using GlobalResponse.Shared;
using System.Threading.RateLimiting;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddMemoryCache();
builder.Services.AddResponseCaching();

builder.Services.AddRateLimiter(options =>
{
    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;

    options.AddPolicy("PerIpFixedWindow", httpContext =>
    {
        // partition by remote IP (works behind proxy if you populate ForwardedHeaders)
        var remoteIp = httpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown";

        return RateLimitPartition.GetFixedWindowLimiter(partitionKey: remoteIp, _ => new FixedWindowRateLimiterOptions
        {
            PermitLimit = 20,               // max requests
            Window = TimeSpan.FromMinutes(1),
            QueueProcessingOrder = QueueProcessingOrder.OldestFirst,
            QueueLimit = 0
        });
    });

    // apply the policy as the default
    options.GlobalLimiter = PartitionedRateLimiter.Create<HttpContext, string>(httpContext =>
    {
        var remoteIp = httpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown";
        return RateLimitPartition.GetFixedWindowLimiter(remoteIp, _ => new FixedWindowRateLimiterOptions
        {
            PermitLimit = 20,
            Window = TimeSpan.FromMinutes(1)
        });
    });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "Catalog API", Version = "v1" });
});

// Register services
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<IBrandService, BrandService>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<IRelatedProdService, RelatedProdService>();
builder.Services.AddScoped<IWishlistService, WishlistService>();
builder.Services.AddScoped<ITranslationService, TranslationService>();

builder.Services.AddScoped<LocalizedMessageService>();
builder.Services.Configure<DuplicateProtectionOptions>(
    builder.Configuration.GetSection("DuplicateProtection"));

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowAll");

// Enable the rate limiting middleware (uses the GlobalLimiter configured above)
app.UseRateLimiter();
app.UseResponseCaching();

app.UseAuthorization();
app.UseRequestDuplicateProtection();
app.MapControllers();

app.Run();
