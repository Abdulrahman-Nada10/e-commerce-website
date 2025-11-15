using Microsoft.EntityFrameworkCore;
using PaymentsService.Models;
namespace PaymentsService.Data

{
    public class PaymentsDbContext: DbContext
    {
        public PaymentsDbContext(DbContextOptions<PaymentsDbContext> options) : base(options)
        {
        }
        public DbSet<Models.Order> Orders { get; set; }
        public DbSet<Models.OrderItem> OrderItems { get; set; }
        public DbSet<Models.Payment> Payments { get; set; }
        public DbSet<Models.PaymentLog> PaymentLogs { get; set; }
        public DbSet<Models.BasicProduct> BasicProducts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // 👇 ده بيقول للـ EF إن الجدول موجود مسبقًا
            modelBuilder.Entity<BasicProduct>().ToTable("Basic_Products").HasKey(p => p.ProductID);
        }

    };
}
