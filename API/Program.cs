using API.Extentions;
using API.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

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

builder.Services.JwtConfiguration(builder.Configuration);

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

app.Run();
