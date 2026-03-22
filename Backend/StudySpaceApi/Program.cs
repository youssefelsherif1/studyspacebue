using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;

try
{
    var builder = WebApplication.CreateBuilder(args);

    // Add services to the container.
    builder.Services.AddControllers();

    // Configure CORS for Cloudflare Pages (FrontendUrl environment variable)
    builder.Services.AddCors(options =>
    {
        options.AddPolicy("AllowFrontend", policy =>
        {
            var frontendUrl = builder.Configuration["FrontendUrl"];
            if (!string.IsNullOrEmpty(frontendUrl))
            {
                policy.WithOrigins(frontendUrl)
                      .AllowAnyHeader()
                      .AllowAnyMethod();
            }
            else
            {
                policy.AllowAnyOrigin()
                      .AllowAnyHeader()
                      .AllowAnyMethod();
            }
        });
    });

    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();

    var app = builder.Build();

    app.UseDeveloperExceptionPage(); // Enable detailed errors in production for diagnostics

    app.UseHttpsRedirection();
    app.UseCors("AllowFrontend");
    app.UseAuthorization();
    app.MapControllers();

    app.MapGet("/", () => new { Status = "API is running successfully on Azure!", Timestamp = DateTime.UtcNow });
    app.MapGet("/api/health", () => new { Status = "Healthy", ConnectionStringCheck = builder.Configuration.GetConnectionString("DefaultConnection") != null ? "Found mapped ConnectionString" : (builder.Configuration["DefaultConnection"] != null ? "Found mapped AppSetting" : "MISSING") });

    app.Run();
}
catch (Exception ex)
{
    Console.WriteLine("CRITICAL STARTUP FAILURE: " + ex.ToString());
    throw;
}
