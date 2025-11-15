namespace CatalogService.Api.DTOs.Categories;

public class CategoryDto
{
    public int CategoryID { get; set; }
    public string Title { get; set; } = null!;
    public string? Description { get; set; }
    public string Icon { get; set; } = null!;
    public int DisplayOrder { get; set; }
    public bool IsActive { get; set; }
}
