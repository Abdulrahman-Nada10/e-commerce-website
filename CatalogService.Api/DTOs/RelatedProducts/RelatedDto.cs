namespace CatalogService.Api.DTOs.RelatedProducts
{
    public class RelatedDto
    {
        public string UserId { get; set; } = string.Empty;
        public long ID { get; set; }
        public long MainProductID { get; set; }
        public long RelatedProductID { get; set; }
        public int DisplayOrder { get; set; }
        public bool IsActive { get; set; } = true;
    }
}
