using API.Data;
using API.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Linq;
using System.Text;

namespace API.Extentions
{
    public static class ServicesExtenstions
    {
        #region ConnectionString configuration
        public static void ConfigureSQLConnection(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<Context>(option =>
            {
                option.UseSqlServer(configuration.GetConnectionString("IdentityApp"));
            });
        }
        #endregion

        #region Identity configuration
        public static void ConfigureIdentity(this IServiceCollection services)
        {
            services.AddIdentityCore<User>(option =>
            {
                option.Password.RequiredLength = 6;
                option.Password.RequireDigit = false;
                option.Password.RequireLowercase = false;
                option.Password.RequireUppercase = false;
                option.Password.RequireNonAlphanumeric = false;

                option.SignIn.RequireConfirmedEmail = true;
            })
                .AddRoles<IdentityRole>()
                .AddRoleManager<RoleManager<IdentityRole>>()
                .AddEntityFrameworkStores<Context>()
                .AddSignInManager<SignInManager<User>>()
                .AddUserManager<UserManager<User>>()
                .AddDefaultTokenProviders();

        }

        #endregion

        #region JWT configuration
        public static void JwtConfiguration(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(option =>
                {
                    option.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Key"])),
                        ValidIssuer = configuration["JWT:Issuer"],
                        ValidateIssuer = true,
                        ValidateAudience = false
                    };
                });
        }
        #endregion

        #region CORSConfiguration
        public static void CORSConfiguration(this IApplicationBuilder app, IConfiguration configuration)
        {
            app.UseCors(option =>
            {
                option.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins(configuration["JWT:ClientUrl"]);
            });
            
        }
        #endregion

        #region  InvalideModelStateConfiguration

        public static void ModelStateValidation(this IServiceCollection services)
        {
            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.InvalidModelStateResponseFactory = actionContext =>

                {
                    var errors = actionContext.ModelState
                    .Where(x => x.Value.Errors.Count > 0)
                    .SelectMany(x => x.Value.Errors)
                    .Select(x => x.ErrorMessage).ToArray();


                    var toReturn = new
                    {
                        errors = errors,
                    };

                    return new BadRequestObjectResult(toReturn);
                };
             
            });
        }

        #endregion

        #region User Policy
        public static void PolicyConfiguration(this IServiceCollection services)
        {
            services.AddAuthorization(opt =>
            {
                opt.AddPolicy("AdminPolicy", policy => policy.RequireRole("Admin"));
                opt.AddPolicy("ManagerPolicy", policy => policy.RequireRole("Manager"));
                opt.AddPolicy("DeveloperPolicy", policy => policy.RequireRole("Developer"));
                opt.AddPolicy("VIPDeveloperPolicy", policy => policy.RequireRole("VIPdeveloper"));
            });
        }
        #endregion

    }
}
