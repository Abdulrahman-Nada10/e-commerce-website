using AuthServices.Api.Models;
using AuthServices.Api.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.DotNet.Scaffolding.Shared.Messaging;
using Microsoft.IdentityModel.Tokens;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AuthServices.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IConfiguration _config;
        private readonly EmailService emailService;
        private readonly RoleManager<IdentityRole> roleManager;
        public AuthController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IConfiguration configuration, EmailService service,RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _config = configuration;
       this . roleManager = roleManager;
            emailService = service;
        }
        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var exsiting = await _userManager.FindByEmailAsync(model.Email);
            if (exsiting is not null)
                return BadRequest(new { Message = ("Email already in use") });
            var user = new ApplicationUser
            {
                UserName = model.Email,
                Email = model.Email,
                Fullname = model.fullName,
            };
            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok(new { Message = "User registered successfully" });
        }
        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {

            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var users = await _userManager.FindByEmailAsync(model.Email);
            if (users == null)
                return Unauthorized();
            if (!await _userManager.CheckPasswordAsync(users, model.Password))
                return Unauthorized();
            var userRoles = await _userManager.GetRolesAsync(users);

            var authClaims = new List<Claim>
{
    new Claim(ClaimTypes.Name, users.Fullname ?? users.UserName),
    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
};

            foreach (var role in userRoles)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, role));
            }

            var jwtSection = _config.GetSection("Jwt");
            var key = jwtSection["Key"];
            var issuer = jwtSection["Issuer"];
            var audience = jwtSection["Audience"];
            var durationMinutes = int.TryParse(jwtSection["DurationInMinutes"], out var d) ? d : 60;

            var expires = model.RememberMe ? DateTime.UtcNow.AddDays(7) : DateTime.UtcNow.AddMinutes(durationMinutes);

            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));

            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                expires: expires,
                 claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
            );

            return Ok(new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token),
                expiration = token.ValidTo
            });



        }
        [HttpPost("sendactivationcodetoemail")]
        public async Task<IActionResult> Sendectivationcodetoemail([FromBody] string email)

        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
                return NotFound(new { Message = "user not found" });
            var activationcode = new Random().Next(100000, 999999).ToString();
            user.SecurityStamp = activationcode;
            await _userManager.UpdateAsync(user);
            string subject = "Account Activation Code";
            string body = $"<h3>Your activation code is: <b>{activationcode}</b></h3>";
            await emailService.SendEmailAsync(email, subject, body);
            return Ok(new { Message = "Activation code sent successfully!" });

        }
        [HttpPost("activecode")]
        public async Task<IActionResult> ActiveCode([FromBody] ActivateAccountRequest code)
        {

            var user = await _userManager.FindByEmailAsync(code.Email);
            if (user == null)
                return NotFound(new { Message = "user not found" });

            if (user.SecurityStamp != code.activationcode)
                return BadRequest(new { Message = "Invalid activation code" });
            user.EmailConfirmed = true;
            user.SecurityStamp = Guid.NewGuid().ToString();
            await _userManager.UpdateAsync(user);
            return Ok(new { Message = ("Account activated successfully!") });



        }
        [HttpPost("forgetpassword")]
        public async Task<IActionResult> ForgetPassword([FromBody] ForgetPasswordRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _userManager.FindByEmailAsync(request.Email);
            if (user == null)
                return NotFound(new
                {
                    Message = ("user not found")
                });
            var ResetCode = new Random().Next(100000, 999999).ToString();
            user.SecurityStamp = ResetCode;
            await _userManager.UpdateAsync(user);
            string subject = "Password Reset Code";
            string body = $"<h3>Your password reset code is: <b>{ResetCode}</b></h3>";
            await emailService.SendEmailAsync(request.Email, subject, body);
            return Ok(new { Message = "Password reset code sent successfully!" });

        }
        [HttpPost("resetpassword")]
        public async Task<IActionResult> ResetPassword(ResetPasswordRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var user = await _userManager.FindByEmailAsync(request.Email);
            if (user == null)
                return NotFound(new
                {
                    Message = ("user not found")
                });

            if (user.SecurityStamp!=request.ResetCode)
                return BadRequest(new { Message = "Invalid reset code" });
            var token=await _userManager.GeneratePasswordResetTokenAsync(user);
            var result=await _userManager.ResetPasswordAsync(user,token,request.ResetCode);
            if (!result.Succeeded)
                return BadRequest (result.Errors);
            user.SecurityStamp=Guid.NewGuid().ToString();
            await _userManager.UpdateAsync(user);
            return Ok(new { Message = "Password has been reset successfully!" });

        }
        //[HttpPost("addrole")]
        //public async Task<IActionResult> AddRole([FromBody] AddRoleRequest request)
        //{
        //    if (!ModelState.IsValid)
        //        return BadRequest(ModelState);
        //    var RoleExsit = await roleManager.RoleExistsAsync(request.RoleName);
        //    if(RoleExsit)
        //        return BadRequest(new { Message = "Role already exists" });
        //    var result = await roleManager.CreateAsync(new IdentityRole(request.RoleName));
        //    if (!result.Succeeded)
        //        return BadRequest(result.Errors);

        //    return Ok(new { Message = "Role created successfully!" });
        //}

        //[HttpPost("setrole")]
        //public async Task<IActionResult> SetRole([FromBody] SetRoleReques request)
        //{
        //    if (!ModelState.IsValid)
        //        return BadRequest(ModelState);
        //    var user = await _userManager.FindByEmailAsync(request.Email);
        //    if (user == null)
        //        return BadRequest(new
        //        {
        //            Message = ("user not found")
        //        });
        //    if (!await roleManager.RoleExistsAsync(request.RoleName)) 
        //    return BadRequest(new { Message = "Role does not exist" });
        //    var result =await _userManager.AddToRoleAsync(user, request.RoleName);
        //    if (!result.Succeeded)
        //        return BadRequest(result.Errors);
        //    return Ok(new { Message = "Role assigned to user successfully!" });

        //}
        [HttpPost("updateuser")]
        public async Task<IActionResult> UpdateUser([FromBody] UpdateUser updateUser)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var user= await _userManager .FindByEmailAsync (updateUser.Email);
            if (user == null)
                return BadRequest(new { Message = ("user not found") });
            user.Fullname= updateUser.FullName;
         var result =  await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
                return BadRequest(result.Errors);
            return Ok(new { Message = "User updated successfully!" });


        }
        //[HttpPost("ToggleUserStatus")]
        //public async Task <IActionResult> ToggleUserStatus([FromBody] SetActiveUser activeUser)
        //{
        //    if (!ModelState.IsValid)
        //        return BadRequest(ModelState);
        //    var user= await _userManager .FindByEmailAsync(activeUser.Email);
        //    if(user == null)
        //        return NotFound(new { Message = ("User not found") });
        //    user.LockoutEnabled = !activeUser.IsActive;
        //    if (!activeUser.IsActive)
        //        user.LockoutEnd = DateTimeOffset.MaxValue;
        //    else
        //        user.LockoutEnd = null;
        //    var result=await _userManager .UpdateAsync(user);
        //    if (result == null)
        //        return BadRequest(result.Errors);
        //    return Ok(new { Message = "User active status updated successfully!" });

        //}
    }
}