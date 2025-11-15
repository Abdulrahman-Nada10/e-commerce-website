namespace CatalogService.Api.DTOs.Wishlist
{
    public class WishListCreateDto
    {
        public string UserId { get; set; } = string.Empty;
        public long ProductId { get; set; }
        public long IsActive { get; set; }
        public int DisplayOrder { get; set; }
    }
}
