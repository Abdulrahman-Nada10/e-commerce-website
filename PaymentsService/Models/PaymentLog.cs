using System.ComponentModel.DataAnnotations.Schema;


namespace PaymentsService.Models
{
    public class PaymentLog
    {
        public int Id { get; set; }
        public int PaymentId { get; set; }

        public string EventType { get; set; } // مثال: PayPalPaymentProcessed
        public string Payload { get; set; } // أي بيانات إضافية من الدفع
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [ForeignKey("PaymentId")]
        public Payment Payment { get; set; }
    }
}
