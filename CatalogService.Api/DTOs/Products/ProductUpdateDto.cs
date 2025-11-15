namespace CatalogService.Api.DTOs.Products;

public class ProductUpdateDto
{
    public string UserId { get; set; } = string.Empty;
    public long ProductID { get; set; }
    public string? Title { get; set; }
    public string? Slug { get; set; }
    public string? Description { get; set; }
    public string? ShortDescription { get; set; }
    public string? SKU { get; set; }
    public decimal? Price { get; set; }
    public decimal? SalePrice { get; set; }
    public string? Currency { get; set; }
    public int? Quantity { get; set; }
    public int? BrandID { get; set; }
    public int? CategoryID { get; set; }
    public string? TranslationsJson { get; set; }
}
