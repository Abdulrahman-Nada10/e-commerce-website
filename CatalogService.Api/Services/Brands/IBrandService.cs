using CatalogService.Api.DTOs.Brands;

namespace CatalogService.Api.Services.Brands
{
    public interface IBrandService
    {
        Task<IEnumerable<BrandDto>> GetBrandsAsync(string languageCode, string? search = null, bool? isActive = null);
        Task<BrandDto> GetBrandByIdAsync(long BrandID, string languageCode);
        Task<int> CreateBrandAsync(string userId, BrandCreateDto dto, string languageCode);
        Task<int> UpdateBrandAsync(string userId, BrandUpdateDto dto, string languageCode);
        Task SetActiveBrandAsync(string userId, int brandId, bool isActive);
        Task DeleteAsync(long id);
    }
}
