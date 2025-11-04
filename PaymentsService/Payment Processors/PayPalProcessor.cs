using PaymentsService.Models;
using PaymentsService.Interfaces;
using PaymentsService.Repositories;
using System.Threading.Tasks;
using System;

namespace PaymentsService.Payment_Processors
{
    public class PayPalProcessor: IPaymentProcessor
    {
        private readonly PaymentRepository _paymentRepository;
        public PayPalProcessor(PaymentRepository paymentRepository)
        {
            _paymentRepository = paymentRepository;
        }
        public async Task<Payment> ProcessPaymentAsync(Payment payment)
        {
            // Simulate PayPal payment processing logic
            payment.Status = "Paid";
            payment.UpdatedAt = DateTime.UtcNow;
            payment.PaymentMethod = "PayPal";

            // Save payment record using the repository
            await _paymentRepository.UpdateOrderStatusAsync(payment.OrderId, "paid");
            await _paymentRepository.UpdatePaymentAsync(payment);
            var log = new PaymentLog
                {
                    PaymentId = payment.Id,
    
                    CreatedAt = DateTime.UtcNow,    
                    EventType = "PayPal_Payment_Success",
                    Payload = $"Payment of {payment.Amount} USD was successful via PayPal."
                    };
            await _paymentRepository.AddPaymentLogAsync(log);
            return payment;
        }
        public Task<string> GetRedirectUrlAsync(Payment payment)
        {
            string url = $"https://www.paypal.com/checkout?amount={payment.Amount}&orderId={payment.OrderId}";
            return Task.FromResult(url);
        }
    }
}
