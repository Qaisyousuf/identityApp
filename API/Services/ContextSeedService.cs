using API.Data;
using API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace API.Services
{
    public class ContextSeedService
    {
        private readonly Context _context;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<User> _userManager;

        public ContextSeedService(Context context, RoleManager<IdentityRole> roleManager, UserManager<User> userManager)
        {
            _context = context;
            _roleManager = roleManager;
            _userManager = userManager;
        }

        public async Task InitializeContextAsync()
        {
            if(_context.Database.GetPendingMigrationsAsync().GetAwaiter().GetResult().Count()>0)
            {
                await _context.Database.MigrateAsync();
            }
            if(!_roleManager.Roles.Any())
            {
                await _roleManager.CreateAsync(new IdentityRole { Name = SD.AdminRole });
                await _roleManager.CreateAsync(new IdentityRole { Name = SD.ManagerRole });
                await _roleManager.CreateAsync(new IdentityRole { Name = SD.DeveloperRole });
            }

            if(!_userManager.Users.AnyAsync().GetAwaiter().GetResult())
            {
                var admin = new User
                {
                    FirstName = "admin",
                    LastName = "jackson",
                    UserName =SD.AdminUserName,
                    Email= SD.AdminUserName,
                    EmailConfirmed = true,
                };
                await _userManager.CreateAsync(admin, "123456");

                await _userManager.AddToRolesAsync(admin,new[] {SD.AdminRole,SD.ManagerRole,SD.DeveloperRole});

                await _userManager.AddClaimsAsync(admin, new Claim[]
                {
                    new Claim(ClaimTypes.Email, admin.Email),
                    new Claim(ClaimTypes.Surname,admin.LastName),
                });
                var manager = new User
                {
                    FirstName = "manager",
                    LastName = "mailson",
                    UserName = "mananger@example.com",
                    Email= "mananger@example.com",
                    EmailConfirmed = true,
                };
                await _userManager.CreateAsync(manager, "123456");

                await _userManager.AddToRoleAsync(manager, SD.ManagerRole);

                await _userManager.AddClaimsAsync(manager, new Claim[]
                {
                    new Claim(ClaimTypes.Email, manager.Email),
                    new Claim(ClaimTypes.Surname,manager.LastName),
                });
                var developer = new User
                {
                    FirstName = "developer",
                    LastName = "miller",
                    UserName = "developer@example.com",
                    Email= "developer@example.com",
                    EmailConfirmed = true,
                };
                await _userManager.CreateAsync(developer, "123456");

                await _userManager.AddToRoleAsync(developer, SD.DeveloperRole);

                await _userManager.AddClaimsAsync(developer, new Claim[]
                {
                    new Claim(ClaimTypes.Email, developer.Email),
                    new Claim(ClaimTypes.Surname,developer.LastName),
                });
                var VIPdeveloper = new User
                {
                    FirstName = "VIPdeveloper",
                    LastName = "tomson",
                    UserName = "VIPdeveloper@example.com",
                    Email= "VIPdeveloper@example.com",
                    EmailConfirmed = true,
                };
                await _userManager.CreateAsync(VIPdeveloper, "123456");

                await _userManager.AddToRoleAsync(VIPdeveloper, SD.DeveloperRole);

                await _userManager.AddClaimsAsync(VIPdeveloper, new Claim[]
                {
                    new Claim(ClaimTypes.Email, VIPdeveloper.Email),
                    new Claim(ClaimTypes.Surname,VIPdeveloper.LastName),
                });
            }

             
        }
    }
}
