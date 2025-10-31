using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AuthServices.Api.Models
{
    public class UserPermission
    {
        [Key]
        public int Id { get; set; }
        public string Email { get; set; }
        public string PermissionName { get; set; }
        [ForeignKey("User")]
        public string UserId { get; set; }
        public  bool IsGranted { get; set; }
    }
}
