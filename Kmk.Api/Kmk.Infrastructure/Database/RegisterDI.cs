using Kmk.Application;
using Kmk.Domain.Arrangements;
using Kmk.Domain.Logging;
using Kmk.Domain.Notifications;
using Kmk.Domain.Users;
using Kmk.Infrastructure.Database.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace Kmk.Infrastructure.Database;

public static class RegisterDI
{
    public static void AddDb(this IServiceCollection services)
    {
        // Repositories
        services.AddScoped<IArrangementRepository, ArrangementRepository>();
        services.AddScoped<ILogRepository, LogRepository>();
        services.AddScoped<INotificationRepository, NotificationRepository>();
        services.AddScoped<ITagRepository, TagRepository>();
        services.AddScoped<IUserRepository, UserRepository>();

        // Unit of work
        services.AddScoped<IUnitOfWork, UnitOfWork>();
    }
}