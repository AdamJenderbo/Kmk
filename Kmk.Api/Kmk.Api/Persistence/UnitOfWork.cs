using Kmk.Persistence;

namespace Kmk.Api.Persistence;

public class UnitOfWork
{
    KmkContext _context;

    public UnitOfWork(KmkContext context)
    {
        _context = context;
    }

    public void Save()
    {
        _context.SaveChanges();
    }
}