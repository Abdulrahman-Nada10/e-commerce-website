using CatalogService.Api.DTOs.RelatedProducts;

namespace CatalogService.Api.Services.RelatedProducts
{
    public interface IRelatedProdService
    {
        Task<IEnumerable<RelatedDto>> GetListAsync(string languageCode, string? search = null, bool? isActive = null);
        Task<long> CreateAsync(string userId, RelatedCreateDto dto, string languageCode);
        Task<long> UpdateAsync(string userID, RelatedUpdateDto dto);
        Task SetActiveAsync(string userID, long ID, bool isActive);
    }
}
