#nullable disable
namespace CatalogService.Api.DTOs.Translations
{
    public class SliderTranslationRequestDto
    {
        public long SliderID { get; set; }
        public string LanguageCode { get; set; }
        public string ShortTitle { get; set; }
        public string LinkTitle { get; set; }
    }

}
