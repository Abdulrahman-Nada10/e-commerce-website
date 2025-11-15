namespace CatalogService.Api.DTOs.Products;

public class ProductCreateDto
{
    public string UserId { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? ShortDescription { get; set; }
    public string? SKU { get; set; }
    public decimal Price { get; set; }
    public decimal? SalePrice { get; set; }
    public string Currency { get; set; } = "USD";
    public int Quantity { get; set; } = 0;
    public int? BrandID { get; set; }
    public int? CategoryID { get; set; }
    public string? ImageUrl { get; set; }
    public string? AltText { get; set; }
    public string LanguageCode { get; set; } = "en";
}
