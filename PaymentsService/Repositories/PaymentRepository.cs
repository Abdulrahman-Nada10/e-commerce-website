
using PaymentsService.Models;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace PaymentsService.Repositories

{
    public class PaymentRepository
    {
     
    
   
    
        private readonly Data.PaymentsDbContext _context;
        public PaymentRepository(Data.PaymentsDbContext context)
        {
            _context = context;
        }
        public async Task <Payment> addpamenttaskasync(Payment payment)
        {
            _context.Payments.Add(payment);
            await  _context.SaveChangesAsync();
            return payment;


        }
       public async Task<Payment> UpdatePaymentAsync(Payment payment )
        {
           _context.Entry(payment).State=EntityState.Modified;
              await _context.SaveChangesAsync();
            return payment;
        }
        public async Task<PaymentLog> AddPaymentLogAsync(PaymentLog log)
        {
             _context.PaymentLogs.Add(log);
            await _context.SaveChangesAsync();
            return log;
        }
        public async Task UpdateOrderStatusAsync(int orderId, string status)
        {
            var order = await _context.Orders.FindAsync(orderId);
            if (order != null)
            {
                order.Status = status;
                await _context.SaveChangesAsync();
            }
        }

    }
}
