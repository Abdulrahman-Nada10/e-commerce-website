using Microsoft.AspNetCore.Identity;
namespace AuthServices.Api.Models
{
    public class ApplicationUser:IdentityUser
    {
        public string Fullname { get; set; }
    }
}
