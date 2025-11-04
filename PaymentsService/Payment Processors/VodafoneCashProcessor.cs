using System;

using PaymentsService.Models;
using PaymentsService.Interfaces;
using PaymentsService.Repositories;


namespace PaymentsService.Payment_Processors
{
    public class VodafoneCashProcessor: IPaymentProcessor
    {
        private readonly PaymentRepository _paymentRepository;
        public VodafoneCashProcessor(PaymentRepository paymentRepository)
        {
            _paymentRepository = paymentRepository;
        }
        public async Task<Payment> ProcessPaymentAsync(Payment payment)
        {
            // Simulate Vodafone Cash payment processing logic
            payment.Status = "Paid";
            payment.UpdatedAt = DateTime.UtcNow;
            payment.PaymentMethod = "Vodafone Cash";
            // Save payment record using the repository
            await _paymentRepository.UpdateOrderStatusAsync(payment.OrderId, "paid");
            await _paymentRepository.UpdatePaymentAsync(payment);
            var log = new PaymentLog
            {
                PaymentId = payment.Id,
                CreatedAt = DateTime.UtcNow,
                EventType = "VodafoneCash_Payment_Success",
                Payload = $"Payment of {payment.Amount} USD was successful via Vodafone Cash."

                };
            await _paymentRepository.AddPaymentLogAsync(log);
            return payment;
        }
        public Task<string> GetRedirectUrlAsync(Payment payment)
        {
            string url = $"https://vodafone.example.com/pay?amount={payment.Amount}&orderId={payment.OrderId}";
            return Task.FromResult(url);
        }
    }
    
    }

