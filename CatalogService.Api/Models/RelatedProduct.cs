namespace CatalogService.Api.Models
{
    public class RelatedProduct
    {
        public long ID { get; set; }
        public long MainProductID { get; set; }
        public string MainProductName { get; set; } = string.Empty;
        public long RelatedProductID { get; set; }
        public string RelatedProductName { get; set; } = string.Empty;
        public string ImageURL { get; set; } = string.Empty;
        public int DisplayOrder { get; set; }
        public bool IsActive { get; set; }
    }
}
