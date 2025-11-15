namespace CatalogService.Api.DTOs.RelatedProducts
{
    public class RelatedUpdateDto
    {
        public long ID { get; set; }
        public long MainProductID { get; set; }
        public long RelatedProductID { get; set; }
        public int DisplayOrder { get; set; }
    }
}
