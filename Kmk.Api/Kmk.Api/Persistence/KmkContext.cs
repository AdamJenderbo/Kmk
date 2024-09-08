using Kmk.Api.Domain.Arrangements;
using Kmk.Api.Domain.Calendar;
using Kmk.Api.Domain.Channels;
using Kmk.Api.Domain.Images;
using Kmk.Api.Domain.Notifications;
using Kmk.Api.Domain.Users;
using Microsoft.EntityFrameworkCore;

namespace Kmk.Persistence;

public class KmkContext : DbContext
{
    public DbSet<Album> Album { get; set; }
    public DbSet<Arrangement> Arrangement { get; set; }
    public DbSet<Channel> Channel { get; set; }
    public DbSet<Event> Event { get; set; }
    public DbSet<Image> Image { get; set; }
    public DbSet<ImageData> ImageData { get; set; }
    public DbSet<Invite> Invite { get; set; }
    public DbSet<Notification> Notification { get; set; }
    public DbSet<Part> Part { get; set; }
    public DbSet<Post> Post { get; set; }
    public DbSet<User> User { get; set; }

    public KmkContext(DbContextOptions<KmkContext> opt) : base(opt)
    {
        
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Album>().HasMany(x => x.Images).WithMany();

        modelBuilder.Entity<Arrangement>()
                    .HasKey(x => x.SerialNumber);

        modelBuilder.Entity<Arrangement>()
                    .Property(x => x.SerialNumber)
                    .ValueGeneratedNever();

        modelBuilder.Entity<Part>()
            .HasKey(x => new { x.ArrangementSerialNumber, x.Instrument });

        modelBuilder.Entity<User>()
            .HasKey(x => x.Id);

        modelBuilder.Entity<UserRole>()
                    .HasKey(x => new { x.UserId, x.Role });

        modelBuilder.Entity<Channel>().HasKey(x => x.Id);
        modelBuilder.Entity<Channel>().HasMany(x => x.Members).WithMany();

        modelBuilder.Entity<Post>().HasKey(x => x.Id);

        modelBuilder.Entity<Event>()
            .HasMany(x => x.Invites)
            .WithOne()
            .OnDelete(DeleteBehavior.NoAction);


        modelBuilder.Entity<Event>()
            .HasOne(x => x.CreatedBy)
            .WithMany()
            .OnDelete(DeleteBehavior.NoAction);

        modelBuilder.Entity<Invite>().HasKey(x => new { x.EventId, x.UserId });

        modelBuilder.Entity<Notification>().HasOne<User>();

        modelBuilder.Entity<ImageData>().HasOne<Image>();
    }
}