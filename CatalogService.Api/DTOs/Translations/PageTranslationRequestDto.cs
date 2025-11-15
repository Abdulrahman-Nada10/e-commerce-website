#nullable disable
namespace CatalogService.Api.DTOs.Translations;

public class PageTranslationRequestDto
{
    public long PageID { get; set; }
    public string LanguageCode { get; set; }
    public string Title { get; set; }
    public string Content { get; set; }
}
