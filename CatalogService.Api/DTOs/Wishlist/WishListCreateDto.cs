namespace CatalogService.Api.DTOs.Wishlist
{
    public class WishListCreateDto
    {
        public long ProductId { get; set; }
        public bool IsActive { get; set; } = true;
        public int DisplayOrder { get; set; } = 0;
        public string LanguageCode { get; set; } = "en";
    }

}
