using API.DTOs.Account;
using API.Models;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Security.Claims;
using System.Text;
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
        private readonly EmailService _emailService;
        private readonly IConfiguration _configuration;

        public AccountController(JwtService jwtService, SignInManager<User> signInManager, UserManager<User> userManager, EmailService emailService, IConfiguration configuration)
        {
            _jwtService = jwtService;
            _signInManager = signInManager;
            _userManager = userManager;
            _emailService = emailService;
            _configuration = configuration;
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
               
            };

            var result = await _userManager.CreateAsync(userToAdd, model.Password);

            if (!result.Succeeded) return BadRequest(result.Errors);

            try
            {
                if (await SendConfirmEmailAsync(userToAdd))
                {
                    return Ok(new JsonResult(new { title = "Account Created", message = "Your account has been created, please confrim your email address" }));
                }

                return BadRequest("Failed to send email. Please contact admin");

            }
            catch (Exception)
            {
                return BadRequest("Failed to send email. Please contact admin");
            }

            //try
            //{
            //    if(await SendConfirmEmailAsync(userToAdd))
            //    {
            //        return Ok(new JsonResult(new { title = "Account Created", message =$"Your account has been created, Please confirm your email {model.Email}" }));
            //    }
            //    return BadRequest("Account Created"); 
            //}

            //catch (Exception)
            //{

            //    return BadRequest("Failed to send email, please contact admin");
            //}


            //return Ok(new JsonResult(new {title="Account Created",message= "Your account has been created, you can login" }));

        }


        [HttpPut("confirm-email")]
        public async Task<IActionResult> confirmEmail(ConfirmEmailDto model)
        {
            var user=await _userManager.FindByEmailAsync(model.Email);
            if (user == null) return Unauthorized("This email address has not been registered yet");

            if (user.EmailConfirmed == true) return BadRequest("Your email was confirmed before, Please login to your account");


            try
            {
                var decodedTokenBytes = WebEncoders.Base64UrlDecode(model.Token);

                var decodedToken = Encoding.UTF8.GetString(decodedTokenBytes);

                var result=await _userManager.ConfirmEmailAsync(user, decodedToken);

                if (result.Succeeded)
                {
                    return Ok(new JsonResult(new { title = "Email confirmed", message = "your email address is confirmed, you can login" }));
                }

                return BadRequest("invalid token, Please try again");

            }
            catch (Exception)
            {

                return BadRequest("invalid token, Please try again");
            }

        }


        [HttpPost("resend-email-confirmation-link/{email}")]
        public async Task<IActionResult> ResendEmailConfirmationLink(string email)
        {
            if (string.IsNullOrEmpty(email)) return BadRequest("Invalid email");

            var user = await _userManager.FindByEmailAsync(email);

            if (user == null) return Unauthorized("This email address has not been registered yet");

            if (user.EmailConfirmed == true) return BadRequest("Your email address was confirmed before, Please login to your account");

            try
            {
                 if(await SendConfirmEmailAsync(user))
                {

                    return Ok(new JsonResult(new { title = "Confirmation linke sent", message = "Please confirm your email address" }));
                }


                else
                {
                    return BadRequest("Failed to send email, Please contact admin");

                }

               
            }
            catch (Exception)
            {

                return BadRequest("Failed to send email, Please contact admin");
            }

        }

        [HttpPost("forgot-username-or-password/{email}")]
        public async Task<IActionResult> ForgotUserNameOrPasswore(string email)
        {
            if (string.IsNullOrEmpty(email)) return BadRequest("Invalid email");

            var user = await _userManager.FindByEmailAsync(email);

            if (user == null) return Unauthorized("This email adress has not been regitered yet");

            if (user.EmailConfirmed == false) return BadRequest("Please confirm your email address first.");

            try
            {
                if(await SendForgotUserNameOrPasswordEmail(user))
                {
                    return Ok(new JsonResult(new { title = "Forgot username or password email sent", message = "Please check your email" }));
                }
                return BadRequest("Failed to send email, Please contact admin");
            }
            catch (Exception)
            {

                return BadRequest("Failed to send email, Please contact admin");
            }
        }

        [HttpPut("reset-password")]
        public async Task<IActionResult> ResetPasswore(ResetPasswordDto model)
        {
               var user= await _userManager.FindByEmailAsync(model.Email);
            if (user == null) return Unauthorized("This email address has not been registered yet");

            if (user.EmailConfirmed == false) return BadRequest("Please confirm your email address first");

            try
            {
                var decodeTokenBytes=WebEncoders.Base64UrlDecode(model.Token);

                var decodedToke = Encoding.UTF8.GetString(decodeTokenBytes);

                var result=await _userManager.ResetPasswordAsync(user, decodedToke,model.NewPassword);

                if (result.Succeeded)
                {
                    return Ok(new JsonResult(new { title = "Password reset success", message = "Your password has been reset" }));
                }
                return BadRequest("Invalid token, Please try again");

            }
            catch (Exception)
            {

                return BadRequest("Invalid token, Please try again");
            }
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


        private async Task<bool> SendConfirmEmailAsync(User user)
        {

            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            token = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));
            var url = $"{_configuration["JWT:ClientUrl"]}/{_configuration["Email:ConfirmEmailPath"]}?token={token}&email={user.Email}";

            var body = $"<p>Dear {user.FirstName} {user.LastName}</p>" +
                "<p>Please confirm your email address by clicking on the following link.</p>" +
                $"<p><a href=\"{url}\">Click here</a></p>" +
                "<p>Thank you,</p>" +
                $"<br>{_configuration["Email:ApplicationName"]}";

            var emailSend = new EmailSendDto(user.Email, "Confirm your email", body);

            return await _emailService.SendEmailAsync(emailSend);
            //var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            //token = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));
            //var url = $"{_configuration["JWT:ClientUrl"]}/ {_configuration["Email:ConfirmEmailPath"]}?token={token}&email={user.Email}";

            //var body = $"<p>Hello: {user.FirstName} {user.LastName}</p>" +

            //    "<p>Please confirm your email address by the clicking on the following link</p>" +
            //    $"<p><a href=\"{url}\">Click here</a></p>" +
            //    "<p>Thank you,</p>" +
            //    $"<br> {_configuration["Email:ApplicationName"]}";

            //var emailSend = new EmailSendDto(user.Email, "Confirm your email", body);

            //return await _emailService.SendEmailAsync(emailSend);
        }

        private async Task<bool> SendForgotUserNameOrPasswordEmail(User user)
        {
            var token=await _userManager.GeneratePasswordResetTokenAsync(user);

            token = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));

            var url = $"{_configuration["JWT:ClientUrl"]}/{_configuration["Email:ResetPasswordPath"]}?token={token}&email={user.Email}";

            var body = $"<p>Dear {user.FirstName} {user.LastName}</p>" +
               $"<p>Username: {user.UserName}.</p>" +
               "<p>In order to reset your password, Please click on the following link.</p>" +
               $"<p><a href=\"{url}\">Click here</a></p>" +
               "<p>Thank you,</p>" +
               $"<br>{_configuration["Email:ApplicationName"]}";

            var emailSend = new EmailSendDto(user.Email, "Reset password", body);

            return await _emailService.SendEmailAsync(emailSend);
        }

        #endregion
    }
}
