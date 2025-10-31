using System.ComponentModel.DataAnnotations;

namespace AuthServices.Api.Models
{
    public class SetActiveUser
    {
        [Required] public string Email { get; set; } = string.Empty;
        [Required] public bool IsActive { get; set; }

    }
}
