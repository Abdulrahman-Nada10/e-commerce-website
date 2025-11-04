using System.ComponentModel.DataAnnotations;

namespace AuthServices.Api.Models
{
    public class UpdateUser
    {
        [Required]
        public string Email { get; set; } = string.Empty;
        [Required]
        public string FullName { get; set; } = string.Empty;
    }
}
