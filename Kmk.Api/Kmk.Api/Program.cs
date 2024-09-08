using Kmk.Api.Application.Arrangements.Commands;
using Kmk.Api.Application.Arrangements.Queries;
using Kmk.Api.Application.Authentication;
using Kmk.Api.Application.Calendar;
using Kmk.Api.Application.Channels;
using Kmk.Api.Application.Chat;
using Kmk.Api.Application.Facebook;
using Kmk.Api.Application.Images;
using Kmk.Api.Application.Notifications;
using Kmk.Api.Application.Users;
using Kmk.Api.Infrastructure.Authentication;
using Kmk.Api.Infrastructure.Authorization;
using Kmk.Api.Persistence;
using Kmk.Api.Persistence.Repositories;
using Kmk.Api.Persistence.Repositories.Images;
using Kmk.Persistence;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var localConnection = "Server=DESKTOP-LPG7OKD; Initial Catalog=Kmk; Trusted_Connection=true; TrustServerCertificate=True";

//var prodConnecton = "Server=db7432.databaseasp.net; Database=db7432; User Id=db7432; Password=A_b5=x7LfR%8; Encrypt=False; MultipleActiveResultSets=True;";

builder.Services.AddSqlServer<KmkContext>(localConnection, options => options.EnableRetryOnFailure());

builder.Services.AddCors(options =>
{
    options.AddPolicy("default", builder =>
    {
        builder
            .WithOrigins(
                "http://localhost:3000",
                //"http://kmk.runasp.net", 
                "https://kungalvsmusikkar.runasp.net"
                //"https://kungalvsmusikkar.runasp.net",
                //"http://kungalvsmusikkar.se",
                //"https://kungalvsmusikkar.se"
                )
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

// Authentication
builder.Services.ConfigureOptions<JwtOptionsSetup>();
builder.Services.ConfigureOptions<JwtBearerOptionsSetup>();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer();

builder.Services.AddScoped<IJwtProvider, JwtProvider>();

// Authorization
builder.Services.AddAuthorization();
builder.Services.AddSingleton<IAuthorizationHandler, RoleAuthorizationHandler>();
builder.Services.AddSingleton<IAuthorizationPolicyProvider, RoleAuthorizationPolicyProvider>();

// Clients
builder.Services.AddScoped<FacebookClient>();

// Commands
builder.Services.AddScoped<AuthenticationService>();
builder.Services.AddScoped<CreateArrangementCommandHandler>();
builder.Services.AddScoped<SaveArrangementCommandHandler>();
builder.Services.AddScoped<DeleteArrangementCommandHandler>();

// Queries
builder.Services.AddScoped<GetArrangementQueryHandler>();
builder.Services.AddScoped<GetArrangementsQueryHandler>();

// Services
builder.Services.AddScoped<AlbumService>();
builder.Services.AddScoped<ChannelService>();
builder.Services.AddScoped<CalendarService>();
builder.Services.AddScoped<ImageService>();
builder.Services.AddScoped<NotificationService>();
builder.Services.AddScoped<UserService>();

// Repositories
builder.Services.AddScoped<AlbumRepository>();
builder.Services.AddScoped<CalendarRepository>();
builder.Services.AddScoped<ChannelRepository>();
builder.Services.AddScoped<ImageRepository>();
builder.Services.AddScoped<NotificationRepository>();

builder.Services.AddScoped<UnitOfWork>();

builder.Services.AddSignalR();

var app = builder.Build();

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
    app.UseSwagger();
    app.UseSwaggerUI();
//}

//app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.UseCors("default");
app.MapHub<ChannelHub>("channel-hub");

app.Run();