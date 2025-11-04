using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PaymentsService.Models
{
    [Table("Basic_Products")]
    public class BasicProduct
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        [Column("ProductID")]
        public int ProductID { get; set; }
        public string Title { get; set; }
        public string Slug { get; set; }
        public string Description { get; set; }
        public string ShortDescription { get; set; }
        public string SKU { get; set; }
        public decimal Price { get; set; }
        public decimal? SalePrice { get; set; }
        public string Currency { get; set; }
        public int Quantity { get; set; }
        public bool IsPublished { get; set; }
        public bool IsFeatured { get; set; }
        public bool IsDeleted { get; set; }
        public int BrandID { get; set; }
        public int CategoryID { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }

    


    }
}
