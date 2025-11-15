#nullable disable
namespace CatalogService.Api.DTOs.Translations;

public class ProductTranslationRequestDto
{
    public long ProductID { get; set; }
    public string LanguageCode { get; set; }
    public string Title { get; set; }
    public string ShortDescription { get; set; }
    public string Description { get; set; }
}
