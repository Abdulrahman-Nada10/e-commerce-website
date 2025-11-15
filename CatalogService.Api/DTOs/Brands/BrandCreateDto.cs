namespace CatalogService.Api.DTOs.Brands;

public class BrandCreateDto
{
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public int DisplayOrder { get; set; } = 0;
    public string? TranslationsJson { get; set; } // JSON translations
}
