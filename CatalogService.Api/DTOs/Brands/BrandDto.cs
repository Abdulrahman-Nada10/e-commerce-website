namespace CatalogService.Api.DTOs.Brands;

public class BrandDto
{
    public int BrandID { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public bool IsActive { get; set; }
    public int DisplayOrder { get; set; }
    public DateTime CreatedAt { get; set; }
}