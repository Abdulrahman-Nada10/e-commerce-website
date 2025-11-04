using CatalogService.Api.DTOs;

namespace CatalogService.Api.Services;

public interface ICategoryService
{
    Task<List<CategoryDto>> GetCategoriesAsync(
        string languageCode = "en",
        string? search = null,
        bool? isActive = null);
}
