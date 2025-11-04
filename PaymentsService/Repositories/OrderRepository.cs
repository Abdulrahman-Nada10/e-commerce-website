using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using PaymentsService.Models;

namespace PaymentsService.Repositories
{
    public class OrderRepository
    {
        private readonly Data.PaymentsDbContext _context;
        public OrderRepository(Data.PaymentsDbContext context)
        {
            _context = context;
        }
        // Add methods to manage orders here
        public async Task<Order> AddOrderAsync(Models.Order order)
        {
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();



            return order;

        }
        public async Task<bool> Addorderitems(int orderId, List<OrderItem> items)
        {

            {
                var order = await _context.Orders.FindAsync(orderId);
                if (order == null)
                {
                    return false;
                }
                foreach (var item in items)
                {
                    var productExists = await _context .BasicProducts.AnyAsync(p => p.ProductID == item.ProductID);
                    if (!productExists)
                        throw new Exception($"Product with ID {item.ProductID} does not exist.");
                    item.OrderID = orderId;
                    _context.OrderItems.Add(item);
                }
                await _context.SaveChangesAsync();
                return true;

            }
        }
    }
}
