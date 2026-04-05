using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace Kmk.Infrastructure.Database;

public class AppDbContextFactory : IDesignTimeDbContextFactory<KmkContext>
{
    public KmkContext CreateDbContext(string[] args)
    {
        // Point to the startup project's path
        var basePath = Path.Combine(Directory.GetCurrentDirectory(), "../Kmk.Api");

        var config = new ConfigurationBuilder()
            .SetBasePath(basePath)
            .AddJsonFile("appsettings.json")
            .Build();

        var optionsBuilder = new DbContextOptionsBuilder<KmkContext>();
        optionsBuilder.UseSqlServer(
            config.GetConnectionString("DefaultConnection"));

        return new KmkContext(optionsBuilder.Options);
    }
}