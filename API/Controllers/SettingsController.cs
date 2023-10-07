using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class SettingsController : ControllerBase
    {
        [HttpGet("get-settings")]
        public IActionResult Settings()
        {
            return Ok(new JsonResult(new { message = "Only authorized users can access settings" }));
        }
    }
}
