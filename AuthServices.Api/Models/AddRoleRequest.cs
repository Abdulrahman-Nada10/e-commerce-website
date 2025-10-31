using System.ComponentModel.DataAnnotations;

namespace AuthServices.Api.Models
{
    public class AddRoleRequest
    {
        [Required(ErrorMessage = "Role name is required")]
        public string RoleName { get; set; }=string.Empty;
    }
}
