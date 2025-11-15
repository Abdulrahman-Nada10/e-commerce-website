using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PaymentsService.Models;
using PaymentsService.Repositories;
using System.Collections.Concurrent;
using Microsoft.Identity;
using Microsoft.AspNetCore;
using System.Linq;
using System.Threading.Tasks;

namespace PaymentsService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly OrderRepository _orderRepository;
        public OrdersController(OrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }
        [HttpPost("CreateOrder")]
        public async Task<IActionResult> CreateOrderwithitems([FromBody] Order order)
        {
            if (order == null)
            {
                return BadRequest(new { Message = "Order data or items are missing or invalid." });
            }
            var createdOrder = await _orderRepository.AddOrderAsync(order);



            return Ok(new
            {
                Message = "Order created successfully.",
                orderId = createdOrder.Id



            });
        }
        [HttpPost("{orderId}/add-items")]
        public async Task<IActionResult> AddItemsToOrder(int orderId, [FromBody] List<OrderItem> items)
        {
            var success = await _orderRepository.Addorderitems(orderId, items);
            if (!success)
            
                return NotFound(new { Message = "Order not found." });
            
            return Ok(new { Message = "Items added to order successfully." });



        }
    }
}

