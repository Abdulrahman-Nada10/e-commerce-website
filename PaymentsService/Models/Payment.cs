using System.ComponentModel.DataAnnotations.Schema;

namespace PaymentsService.Models
{
    public class Payment
    {
        public int Id { get; set; } 
        public decimal Amount { get; set; }
        public string PaymentMethod { get; set; } // PayPal, VodafoneCash, CreditCard
        public string Status { get; set; } = "Pending";
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
        public int OrderId { get; set; }
        public Order Order { get; set; }

       
      
      


    }
}
