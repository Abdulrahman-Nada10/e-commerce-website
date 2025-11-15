using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace PaymentsService.Models
{
    public class Order
    {
        [Key]
        public int Id  {get; set; } 
        public  string UserId { get; set; }  // الربط مع المستخدم (لو موجود جدول Users)

        public DateTime OrderDate { get; set; } = DateTime.UtcNow;
        public decimal TotalAmount { get; set; }
        public string Status { get; set; } = "Pending";
        // Pending, Paid, Shipped
        //public ICollection<OrderItem> OrderItems { get; set; }



    }
}
