using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs.Account
{
    public class ResetPasswordDto
    {
        [Required]
        
        public string Token { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [StringLength(15,MinimumLength =6,ErrorMessage ="New Password must be at least {2}, and maximum {1} charcters")]
        public string NewPassword { get; set; }
    }
}
