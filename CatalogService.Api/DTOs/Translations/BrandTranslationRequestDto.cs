#nullable disable
namespace CatalogService.Api.DTOs.Translations
{
    public class BrandTranslationRequestDto
    {
        public int BrandID { get; set; }
        public string LanguageCode { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
    }

}
