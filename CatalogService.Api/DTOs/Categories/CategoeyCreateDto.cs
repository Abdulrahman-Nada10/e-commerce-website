namespace CatalogService.Api.DTOs.Categories
{
    public class CategoryCreateDto
    {
        public string Title { get; set; } = null!;
        public string Icon { get; set; } = null!;
        public string? Description { get; set; }
        public int DisplayOrder { get; set; } = 0;
        public string? Translations { get; set; } // JSON array
    }
}
