using AuthServices.Api.Data;
using AuthServices.Api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AuthServices.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly AppDbContext appContext;


        public AdminController(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, AppDbContext appContext)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            this.appContext = appContext;
        }
        [HttpPost("addrole")]
        public async Task<IActionResult> AddRole([FromBody] AddRoleRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var RoleExsit = await roleManager.RoleExistsAsync(request.RoleName);
            if (RoleExsit)
                return BadRequest(new { Message = "Role already exists" });
            var result = await roleManager.CreateAsync(new IdentityRole(request.RoleName));
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok(new { Message = "Role created successfully!" });
        }



        [HttpGet("GetALLusers")]
        public async Task<IActionResult> GetALLUsers()
        {
            var user = await userManager.Users.Select(u => new
            {
                u.UserName,
                u.Fullname,
                u.Email,
                u.EmailConfirmed,

                u.LockoutEnd,
                IsActive = u.LockoutEnd == null
            }).ToListAsync();
            return Ok(user);
        }
        [HttpPost("setrole")]
        public async Task<IActionResult> SetRole([FromBody] SetRoleReques request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var user = await userManager.FindByEmailAsync(request.Email);
            if (user == null)
                return BadRequest(new
                {
                    Message = ("user not found")
                });
            if (!await roleManager.RoleExistsAsync(request.RoleName))
                return BadRequest(new { Message = "Role does not exist" });
            var result = await userManager.AddToRoleAsync(user, request.RoleName);
            if (!result.Succeeded)
                return BadRequest(result.Errors);
            return Ok(new { Message = "Role assigned to user successfully!" });

        }
        [HttpPost("ToggleUserStatus")]
        public async Task<IActionResult> ToggleUserStatus([FromBody] SetActiveUser activeUser)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var user = await userManager.FindByEmailAsync(activeUser.Email);
            if (user == null)
                return NotFound(new { Message = ("User not found") });
            user.LockoutEnabled = !activeUser.IsActive;
            if (!activeUser.IsActive)
                user.LockoutEnd = DateTimeOffset.MaxValue;
            else
                user.LockoutEnd = null;
            var result = await userManager.UpdateAsync(user);
            if (!result.Succeeded)
                return BadRequest(result.Errors);
            return Ok(new { Message = "User active status updated successfully!" });

        }
        [HttpPost("addPermission")]
        public async Task<IActionResult> AddPermission([FromBody] UserPermission request)
        {
            var user = await userManager.FindByEmailAsync(request.UserId);
            if (user == null)
                return NotFound(new { Message = ("User not found") });
            var PermissionExsit = await roleManager.RoleExistsAsync(request.PermissionName);
            if (PermissionExsit)
                return BadRequest(new { Message = "Role already exists" });
            var result = await roleManager.CreateAsync(new IdentityRole(request.PermissionName));
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok(new { Message = "Role created successfully!" });

        
    }


[HttpPost("RemovePermission")]
public async Task<IActionResult> RemovePermission([FromBody] UserPermission request)

{
    var user = await userManager.FindByEmailAsync(request.Email);
    if (user == null)
        return NotFound(new { Message = ("User not found") });
    var Permission = await appContext.userPermissions.FirstOrDefaultAsync(p => p.UserId==user.Id&&p.PermissionName==request.PermissionName);


            if(Permission== null)
                return NotFound("Permission not found for this user");
            appContext.userPermissions.Remove(Permission);
            await appContext.SaveChangesAsync();
            return Ok(new { Message = "Permission removed successfully " });

        }
    }

}
