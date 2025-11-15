#nullable disable
namespace CatalogService.Api.DTOs.Translations
{
    public class SetEntityTranslationsDto
    {
        public long RecordID { get; set; }
        public string TableName { get; set; }
        public List<ColumnTranslationDto> Columns { get; set; }
    }

    public class ColumnTranslationDto
    {
        public string ColumnName { get; set; }
        public string LanguageCode { get; set; }
        public string Value { get; set; }
    }
}
