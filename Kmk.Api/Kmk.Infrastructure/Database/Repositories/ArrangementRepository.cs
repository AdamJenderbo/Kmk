using Kmk.Domain.Arrangements;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Kmk.Infrastructure.Database.Repositories;

public class ArrangementRepository(KmkContext _db) : IArrangementRepository
{
    /// <summary>
    /// Lägger till arrangeamang
    /// </summary>
    /// <param name="arrangement"></param>
    public void Add(Arrangement arrangement)
    {
        _db.Arrangement.Add(arrangement);
    }

    /// <summary>
    /// Kollar ifall något arrangemang uppfyller predikatet
    /// </summary>
    /// <param name="predicate"></param>
    /// <returns></returns>
    public async Task<bool> Any(Expression<Func<Arrangement, bool>> predicate)
    {
        return await _db.Arrangement.AnyAsync(predicate);
    }

    /// <summary>
    /// Läser upp arrangemang via löpnummer
    /// </summary>
    /// <param name="serialNumber"></param>
    /// <returns></returns>
    public async Task<Arrangement?> GetBySerialNumber(int serialNumber)
    {
        return await _db.Arrangement
            .Include(x => x.Parts)
            .SingleOrDefaultAsync(x => x.SerialNumber == serialNumber);
    }

    /// <summary>
    /// Listar alla arrangemang
    /// </summary>
    /// <returns></returns>
    public async Task<IEnumerable<Arrangement>> List()
    {
        return await _db.Arrangement.ToListAsync();
    }

    /// <summary>
    /// Tar bort arrangemang
    /// </summary>
    /// <param name="arrangement"></param>
    public void Remove(Arrangement arrangement)
    {
        _db.Arrangement.Remove(arrangement);
    }
}