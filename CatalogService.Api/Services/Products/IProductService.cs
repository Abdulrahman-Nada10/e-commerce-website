using CatalogService.Api.DTOs.Products;
namespace CatalogService.Api.Services.Products;

public interface IProductService
{
    Task<IEnumerable<ProductDto>> GeListAsync(string languageCode, string? search = null, int? categoryID = null, int? brandID = null, bool? isActive = null);
    Task<ProductDto> GetByIDAsync(long ProductID, string languageCode);
    Task<IEnumerable<ProductDto>> GetListByCategoryIDAsync(int CategoryID, string languageCode);
    Task<int> CreateAsync(string userID, ProductCreateDto dto, string languageCode);
    Task<int> UpdateAsync(string userID, ProductUpdateDto dto, string languageCode);
    Task SetActiveAsync(string userID, int productID, bool isActive);
    Task DeleteAsync(long ProductID);
}
