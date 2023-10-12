using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolesController : ControllerBase
    {

        #region User Roles
      
        [HttpGet("public")]
        public IActionResult Public()
        {
            return Ok("Public");
        }

        [HttpGet("admin-roles")]
        [Authorize(Roles = "Admin")]
        public IActionResult AdminRole()
        {
            return Ok("Admin role");
        }

        [HttpGet("manager-role")]
        [Authorize(Roles ="Manager")]
        public IActionResult ManagerRole()
        {
            return Ok("manager role");
        }
        [HttpGet("developer-role")]
        [Authorize(Roles = "Developer")]
        public IActionResult DeveloperRole()
        {
            return Ok("Developer role");
        }

        [HttpGet("vipdeveloper-role")]
        [Authorize(Roles = "VIPDeveloper")]
        public IActionResult VIPDeveloperRole()
        {
            return Ok("VIP Developer role");
        }

        [HttpGet("admin-or-manager-role")]
        [Authorize(Roles = "Admin,Manager")]
        public IActionResult AdminOrManagerRole()
        {
            return Ok("Admin or manager role");
        }

        [HttpGet("Admin-or-developer-role")]
        [Authorize(Roles = "Admin,Developer")]
        public IActionResult AdminOrDeveloperRole()
        {
            return Ok("Admin or developer role");
        }
        #endregion

        #region User Policy

        [HttpGet("Admin-policy")]
        [Authorize(policy:"AdminPolicy")]
        public IActionResult AdminPolicy()
        {
            return Ok("Admin Policy");
        }


        [HttpGet("manager-policy")]
        [Authorize(policy: "ManagerPolicy")]
        public IActionResult ManagerPolicy()
        {
            return Ok("Manager Policy");
        }


        [HttpGet("developer-policy")]
        [Authorize(policy: "DeveloperPolicy")]
        public IActionResult DevelooperPolicy()
        {
            return Ok("Developer Policy");
        }


        [HttpGet("vip-developer-policy")]
        [Authorize(policy: "VIPDeveloperPolicy")]
        public IActionResult IVPDeveloperPolicy()
        {
            return Ok("VIP Develooper Policy");
        }
        #endregion

    }
}
