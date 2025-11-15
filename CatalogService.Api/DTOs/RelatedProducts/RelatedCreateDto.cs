namespace CatalogService.Api.DTOs.RelatedProducts
{
    public class RelatedCreateDto
    {
        public long MainProductID { get; set; }
        public long RelatedProductID { get; set; }
        public int DisplayOrder { get; set; }
        public bool IsActive { get; set; } = true;
    }
}
