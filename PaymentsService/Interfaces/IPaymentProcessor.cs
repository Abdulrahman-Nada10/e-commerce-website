using System.Threading.Tasks;
using PaymentsService.Models;
namespace PaymentsService.Interfaces
{
    public interface IPaymentProcessor
    {
        public Task<Payment> ProcessPaymentAsync(Payment payment);
        Task<string> GetRedirectUrlAsync(Payment payment);

    }
}
