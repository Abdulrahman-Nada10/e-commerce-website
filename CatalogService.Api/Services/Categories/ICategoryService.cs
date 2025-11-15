using CatalogService.Api.DTOs.Categories;

namespace CatalogService.Api.Services.Categories;

public interface ICategoryService
{
    Task<IEnumerable<CategoryDto>> GetListAsync(string languageCode, string? search = null, bool? isActive = null);
    Task<CategoryDto?> GetByIdAsync(int categoryID, string languageCode);
    Task<int> CreateAsync(string userID, CategoryCreateDto dto, string languageCode);
    Task<int> UpdateAsync(string userID, CategoryUpdateDto dto, string languageCode);
    Task SetActiveAsync(string userID, int categoryID, bool isActive, string languageCode);
    Task DeleteAsync(long id);
}
