using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PaymentsService.Models
{
    public class OrderItem
    {
        [Key]
        public int OrderItemID { get; set; }

        public int OrderID { get; set; }
        public int ProductID { get; set; }

        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
       
       
      





        
    }
}
