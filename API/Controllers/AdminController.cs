﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using API.Models;
using System.Threading.Tasks;
using System.Collections.Generic;
using API.DTOs.Admin;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;

namespace API.Controllers
{
    [Authorize(Roles ="Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public AdminController(UserManager<User> userManager, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }



        [HttpGet("get-members")]
        public async Task<ActionResult<IEnumerable<MemberViewDto>>> GetMemebers()
        {

            var members = await _userManager.Users
                .Where(x => x.UserName != SD.AdminUserName)
                .Select(member => new MemberViewDto
                {
                    Id = member.Id,
                    UserName = member.UserName,
                    FirstName = member.FirstName,
                    LastName = member.LastName,
                    DateCreated = member.DateCreated,
                    IsLocked = _userManager.IsLockedOutAsync(member).GetAwaiter().GetResult(),
                    Roles = _userManager.GetRolesAsync(member).GetAwaiter().GetResult(),

                }).ToListAsync();

            return Ok(members);

        }

        [HttpPut("lock-member/{id}")]
        public async Task<IActionResult> LockMemeber(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null) return NotFound();


            if (IsAdminUserId(id))
            {
                return BadRequest(SD.SupperAdminChangeNotAllowed);
            }
            await _userManager.SetLockoutEndDateAsync(user, DateTime.UtcNow.AddDays(5));

            return NoContent();
        }

        [HttpPut("unlock-member/{id}")]   
        public async Task<ActionResult> UnlockMemeber(string id)
        {
            var user=await _userManager.FindByIdAsync(id);

            if(user == null) return NotFound();

            if (IsAdminUserId(id))
            {
                return BadRequest(SD.SupperAdminChangeNotAllowed);
            }

            await _userManager.SetLockoutEndDateAsync(user, null);

            return NoContent();
        }


        [HttpGet("get-member/{id}")]
        public async Task<ActionResult<MemberAddEditDto>> GetMemeber(string id)
        {
            var memeber = await _userManager.Users
                .Where(x => x.UserName != SD.AdminUserName && x.Id == id)
                .Select(m => new MemberAddEditDto
                {
                    Id = m.Id,
                    UserName = m.UserName,
                    FirstName = m.FirstName,
                    LastName = m.LastName,
                    Roles = string.Join(",", _userManager.GetRolesAsync(m).GetAwaiter().GetResult())

                }).FirstOrDefaultAsync();

            return Ok(memeber);
        }

        [HttpPost("add-edit-member")]
        public async Task<IActionResult> AddEditmemeber(MemberAddEditDto model)
        {
            User user;

            if (string.IsNullOrEmpty(model.Id))
            {
                if(string.IsNullOrEmpty(model.Password) || model.Password.Length < 6)
                {
                    ModelState.AddModelError("errors", "Password must be at least 6 characters");
                }
                user = new User
                {
                    FirstName=model.FirstName.ToLower(),
                    LastName=model.LastName.ToLower(),
                    UserName=model.UserName.ToLower(),
                    EmailConfirmed=true,

                };

                var result = await _userManager.CreateAsync(user, model.Password);
                if (!result.Succeeded) return BadRequest(result.Errors);

            }
            else
            {
                if (!string.IsNullOrEmpty(model.Password))
                {
                    if (model.Password.Length < 6)
                    {
                        ModelState.AddModelError("errors", "Password must be at least 6 character");

                        return BadRequest(ModelState);
                    }
                }

                if(IsAdminUserId(model.Id))
                {
                    return BadRequest(SD.SupperAdminChangeNotAllowed);
                }


                user = await _userManager.FindByIdAsync(model.Id);

                if (user == null) return NotFound();

                user.FirstName = model.FirstName.ToLower();
                user.LastName = model.LastName.ToLower();
                user.UserName = model.UserName.ToLower();


                if (!string.IsNullOrEmpty(model.Password))
                {
                    await _userManager.RemovePasswordAsync(user);
                    await _userManager.AddPasswordAsync(user, model.Password);
                }



            }

            var userRoles = await _userManager.GetRolesAsync(user);

            await _userManager.RemoveFromRolesAsync(user, userRoles);


            foreach (var role in model.Roles.Split(",").ToArray())
            {
                var roletoAdd = await _roleManager.Roles.FirstOrDefaultAsync(r => r.Name == role);

                if(roletoAdd !=null)
                {
                    await _userManager.AddToRoleAsync(user, role);
                }
            }

           if(string.IsNullOrEmpty(model.Id))
            {
                return Ok(new JsonResult(new { title = "Memeber Created", message = $"{model.UserName} has been created" }));
            }
            else
            {
                return Ok(new JsonResult(new { title = "Memeber Edited", message = $"{model.UserName} has been updated" }));
            }
        }
        [HttpDelete("delete-member/{id}")]
        public async Task<IActionResult> DeleteMemeber(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null) return NotFound();

            if (IsAdminUserId(id))
            {
                return BadRequest(SD.SupperAdminChangeNotAllowed);
            }

            await _userManager.DeleteAsync(user);
            return NoContent();
        }



        [HttpGet("get-application-roles")]
        public async Task<ActionResult<string[]>> GetApplicationRoles()
        {
            var roles=await _roleManager.Roles.Select(x => x.Name).ToListAsync();

            return Ok(roles);
        }

        private bool IsAdminUserId(string userId)
        {
            return _userManager.FindByIdAsync(userId).GetAwaiter().GetResult().UserName.Equals(SD.AdminUserName); 
        }
    }
}
