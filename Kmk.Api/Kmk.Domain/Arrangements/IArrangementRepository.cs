using System.Linq.Expressions;

namespace Kmk.Domain.Arrangements;

public interface IArrangementRepository
{
    void Add(Arrangement arrangement);
    Task<bool> Any(Expression<Func<Arrangement, bool>> predicate);
    Task<Arrangement?> GetBySerialNumber(int serialNumber);
    Task<IEnumerable<Arrangement>> List();
    void Remove(Arrangement arrangement);
}