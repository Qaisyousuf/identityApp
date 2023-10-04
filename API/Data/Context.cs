﻿using API.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class Context:IdentityDbContext<User>
    {
        public Context(DbContextOptions<Context> option):base(option)
        {
            
        }
    }
}
