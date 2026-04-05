using Kmk.Domain.Arrangements;
using Kmk.Domain.Logging;
using Kmk.Domain.Notifications;
using Kmk.Domain.Users;
using Microsoft.EntityFrameworkCore;

namespace Kmk.Infrastructure.Database;

public class KmkContext : DbContext
{
    public DbSet<Arrangement> Arrangement { get; set; }
    public DbSet<ArrangementPart> ArrangementPart { get; set; }
    public DbSet<LogMessage> LogMessage { get; set; }
    public DbSet<Notification> Notification { get; set; }
    public DbSet<NotificationUser> NotificationUser { get; set; }
    public DbSet<User> User { get; set; }

    public KmkContext(DbContextOptions<KmkContext> opt) : base(opt)
    {

    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Arrangement>()
                    .HasKey(x => x.SerialNumber);

        modelBuilder.Entity<Arrangement>()
                    .Property(x => x.SerialNumber)
                    .ValueGeneratedNever();

        modelBuilder.Entity<ArrangementPart>()
            .HasKey(x => new { x.ArrangementSerialNumber, x.Instrument });

        modelBuilder.Entity<NotificationUser>()
            .HasKey(x => new { x.UserId, x.NotificationId });

        modelBuilder.Entity<User>()
            .HasKey(x => x.Id);

        modelBuilder.Entity<UserRole>()
                    .HasKey(x => new { x.UserId, x.Role });

    }
}