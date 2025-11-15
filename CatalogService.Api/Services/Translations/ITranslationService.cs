using CatalogService.Api.DTOs.Translations;

namespace CatalogService.Api.Services.Translations
{
    public interface ITranslationService
    {
        Task SetEntityTranslationsAsync(SetEntityTranslationsDto dto);
    }

}
