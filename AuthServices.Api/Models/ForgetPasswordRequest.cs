using System.ComponentModel.DataAnnotations;

namespace AuthServices.Api.Models
{
    public class ForgetPasswordRequest
    {
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email format")]
        public string Email { get; set; }=String.Empty;
    }
}
