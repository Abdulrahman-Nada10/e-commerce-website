
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace CatalogService.Api.Models;

[Table("Basic_Products")]
public class Product
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long ProductID { get; set; }

    [Required]
    [MaxLength(255)]
    public string Title { get; set; } = string.Empty;

    [Required]
    [MaxLength(255)]
    public string Slug { get; set; } = string.Empty;

    public string? Description { get; set; }

    [MaxLength(500)]
    public string? ShortDescription { get; set; }

    [MaxLength(100)]
    public string? SKU { get; set; }

    [Column(TypeName = "decimal(18,2)")]
    public decimal Price { get; set; } = 0;

    [Column(TypeName = "decimal(18,2)")]
    public decimal? SalePrice { get; set; }

    [Required]
    [MaxLength(10)]
    public string Currency { get; set; } = "USD";

    public int Quantity { get; set; } = 0;

    public bool IsPublished { get; set; } = false;
    public bool IsFeatured { get; set; } = false;
    public bool IsDeleted { get; set; } = false;

    [ForeignKey("Brand")]
    public int? BrandID { get; set; }

    [ForeignKey("Category")]
    public int? CategoryID { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime? UpdatedAt { get; set; }
    public DateTime? DeletedAt { get; set; }

    // Navigation properties
    public virtual Brand? Brand { get; set; }
    public virtual Category? Category { get; set; }
}

