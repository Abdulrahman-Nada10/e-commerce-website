using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PaymentsService.Interfaces;
using PaymentsService.Models;
using PaymentsService.Payment_Processors;
using PaymentsService.Repositories;
using System;
using System.Threading.Tasks;
namespace PaymentsService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentsController : ControllerBase
    {
     public readonly PaymentRepository paymentRepository;
     
        public PaymentsController(PaymentRepository paymentRepository)

        {
            this.paymentRepository = paymentRepository;

        }

        [HttpPost("process")]
        public async Task<IActionResult> Pay([FromBody] Payment payment)
        {
            
            if (payment== null)
    {
        return BadRequest(new { Message = "Payment data is missing or invalid." });
    }

IPaymentProcessor processor;

switch (payment.PaymentMethod)
{
    case "PayPal":
       processor = new PayPalProcessor (paymentRepository) ;
        break;
    case "VodafoneCash":
        processor = new VodafoneCashProcessor(paymentRepository);
        break;
    case "CreditCard":
        processor = new CreditCardProcessor(paymentRepository);
        break;
                default:
                    return BadRequest(new { Message = "Payment method not supported." });
            }

            var processedPayment = await processor.ProcessPaymentAsync(payment);
            var redirectUrl = processor is PayPalProcessor
               ? await ((PayPalProcessor)processor).GetRedirectUrlAsync(payment)
               : null;
            return Ok(new
            {
                Message = $"Redirect to {payment.PaymentMethod} for payment.",
                RedirectUrl = redirectUrl,
                Payment = processedPayment

            });
            }
    }
}




