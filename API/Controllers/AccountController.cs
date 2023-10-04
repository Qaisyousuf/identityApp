using API.DTOs.Account;
using API.Models;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly JwtService _jwtService;
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;

        public AccountController(JwtService jwtService, SignInManager<User> signInManager, UserManager<User> userManager)
        {
            _jwtService = jwtService;
            _signInManager = signInManager;
            _userManager = userManager;
        }


        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto model)
        {
            var user = await _userManager.FindByNameAsync(model.UserName);
            if (user == null) return BadRequest("Invalide usernam  or password");

            if (user.EmailConfirmed == false) return Unauthorized("Please confirme your email address");

            var result = await _signInManager.CheckPasswordSignInAsync(user, model.Password, false);

            if (!result.Succeeded) return Unauthorized("Invalide usernam  or password");

            return CreateApplicationUserDto(user);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto model)
        {
            if (await CheckEmailExistesAsync(model.Email))
            {
                return BadRequest($"An existing account using {model.Email}, email address. please try with another email");
            }

            var userToAdd=new User 
            { 
               
                FirstName= model.FirstName.ToLower(),
                LastName= model.LastName.ToLower(),
                UserName=model.Email.ToLower(),
                Email = model.Email.ToLower(),
                EmailConfirmed=true,
            };

            var result = await _userManager.CreateAsync(userToAdd, model.Password);

            if (!result.Succeeded) return BadRequest(result.Errors);

            return Ok("Your account has been created, you can login");

        }

        [Authorize]
        [HttpGet("refresh-user-token")]
        public async Task<ActionResult<UserDto>> RefreshUserToken()
        {
            var user = await _userManager.FindByNameAsync(User.FindFirst(ClaimTypes.Email)?.Value);

            return CreateApplicationUserDto(user);
        }

        #region Private helper methods

        private UserDto CreateApplicationUserDto(User user)
        {
            return new UserDto
            {
                FirstName=user.FirstName,
                LastName=user.LastName,
                JWT=_jwtService.CreateJWT(user),
            };
        }

        private async Task<bool> CheckEmailExistesAsync(string email)
        {
            return await _userManager.Users.AnyAsync(x => x.Email == email.ToLower());
        }
        #endregion
    }
}
