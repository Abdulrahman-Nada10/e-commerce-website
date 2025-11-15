namespace CatalogService.Api.DTOs.Products;
public class ProductDto
{
    public long ProductID { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? ShortDescription { get; set; }
    public string Slug { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public decimal? SalePrice { get; set; }
    public string Currency { get; set; } = "EGP";
    public int Quantity { get; set; }
    public bool IsPublished { get; set; }
    public bool IsFeatured { get; set; }
    public DateTime CreatedAt { get; set; }
    public string? CategoryTitle { get; set; }
    public string? BrandTitle { get; set; }
}
