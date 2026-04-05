using Kmk.Api.Filters;
using Kmk.Api.Middlewares;
using Kmk.Application;
using Kmk.Application.Logging.Services.Implementations;
using Kmk.Application.Notifications.Services;
using Kmk.Application.Notifications.Services.NotificationService;
using Kmk.Application.Users;
using Kmk.Application.Users.Services;
using Kmk.Application.Users.Services.Implementations;
using Kmk.Infrastructure.Authentication;
using Kmk.Infrastructure.Authorization;
using Kmk.Infrastructure.Database;
using Kmk.Infrastructure.Email;
using Kmk.Infrastructure.GoogleDrive;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers(options => 
{
    options.Filters.Add<ApiResponseFilter>();
});

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddCors(options =>
{
    options.AddPolicy("default", builder =>
    {
        builder
            .WithOrigins(
                "http://localhost:3000",
                //"http://kmk.runasp.net", 
                "https://kungalvsmusikkar.runasp.net",
                //"https://kungalvsmusikkar.runasp.net",
                //"http://kungalvsmusikkar.se",
                "https://kungalvsmusikkar.se"
                )
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

builder.Services.AddMediatR(cfg => {
    //cfg.LicenseKey = "<License Key here>";
    cfg.RegisterServicesFromAssemblies(AppDomain.CurrentDomain
        .GetAssemblies()
        .Where(a =>
            !a.IsDynamic &&
            a.FullName.StartsWith("Kmk.")
        )
        .ToArray());
});

// Authentication
builder.Services.ConfigureOptions<JwtOptionsSetup>();
builder.Services.ConfigureOptions<JwtBearerOptionsSetup>();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer();
builder.Services.AddScoped<ITokenGenerator, TokenGenerator>();

// Authorization
builder.Services.AddAuthorization();
builder.Services.AddSingleton<IAuthorizationHandler, RoleAuthorizationHandler>();
builder.Services.AddSingleton<IAuthorizationPolicyProvider, RoleAuthorizationPolicyProvider>();
builder.Services.AddScoped<ITokenGenerator, TokenGenerator>();

// Db context
builder.Services.AddDbContext<KmkContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("Default")));

// Database
builder.Services.AddDb();

// Services
builder.Services.AddScoped<ICryptographyService, CryptographyService>();
builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddScoped<IFileStorageService, GoogleDriveStorageService>();
builder.Services.AddScoped<Kmk.Application.Logging.Services.ILogger, Logger>();
builder.Services.AddScoped<INotificationService, NotificationService>();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<KmkContext>();

    var shouldMigrate = builder.Configuration.GetValue<bool>("RunMigrations");

    if (shouldMigrate)
    {
        db.Database.Migrate();
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.UseMiddleware<ApiExceptionMiddleware>();

app.UseCors("default");

app.Run();