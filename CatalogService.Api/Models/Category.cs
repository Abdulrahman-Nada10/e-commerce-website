namespace CatalogService.Api.Models;

public class Category
{
    public int CategoryID { get; set; }
    public string Title { get; set; } = null!;
    public string Icon { get; set; } = null!;
    public string? Description { get; set; }
    public int DisplayOrder { get; set; }
    public bool IsActive { get; set; } = true;
}

public class CategoryTranslation
{
    public int CategoryID { get; set; }
    public string LanguageCode { get; set; } = null!;
    public string ColumnName { get; set; } = null!;
    public string TranslatedValue { get; set; } = null!;
}
