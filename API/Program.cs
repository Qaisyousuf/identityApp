using API.Extentions;
using API.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// configuration of extenstions methods
builder.Services.ConfigureSQLConnection(builder.Configuration);
builder.Services.ConfigureIdentity();
builder.Services.AddScoped<JwtService>();
builder.Services.AddScoped<EmailService>();
builder.Services.AddScoped<ContextSeedService>();

builder.Services.JwtConfiguration(builder.Configuration);
builder.Services.PolicyConfiguration();

builder.Services.AddCors();

builder.Services.ModelStateValidation();

var app = builder.Build();

app.CORSConfiguration(builder.Configuration);


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

#region ContextSeed

using var scope = app.Services.CreateScope();

try
{
     var contextSeedServices=scope.ServiceProvider.GetService<ContextSeedService>();

    await contextSeedServices.InitializeContextAsync();
}
catch (Exception ex)
{

    var logger = scope.ServiceProvider.GetService<ILogger<Program>>();

    logger.LogError(ex.Message, "Fiiled to initialize and seed the database");
}

#endregion

app.Run();
