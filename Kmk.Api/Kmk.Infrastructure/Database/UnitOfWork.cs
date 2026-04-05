using Kmk.Application;

namespace Kmk.Infrastructure.Database;

public class UnitOfWork(KmkContext _context) : IUnitOfWork
{
    public async Task Save()
    {
        await _context.SaveChangesAsync();
    }
}