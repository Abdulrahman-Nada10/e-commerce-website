#nullable disable
namespace CatalogService.Api.DTOs.Translations;

public class FooterMenuTranslationRequestDto
{
    public int FooterID { get; set; }
    public string LanguageCode { get; set; }
    public string LinkTitle { get; set; }
}
