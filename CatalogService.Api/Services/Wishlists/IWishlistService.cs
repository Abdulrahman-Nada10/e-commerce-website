using CatalogService.Api.DTOs.Wishlist;

namespace CatalogService.Api.Services.Wishlists
{
    public interface IWishlistService
    {
        Task<long> AddAsync(string UserID, WishListCreateDto dto, string languageCode);
        Task<IEnumerable<WishListDto>> GetByUserAsync(string userId, string lang);
        Task<bool> DeleteAsync(string userId, long wishListId, string lang);
    }
}
