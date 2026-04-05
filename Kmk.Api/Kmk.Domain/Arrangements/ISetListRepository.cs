namespace Kmk.Domain.Arrangements;

public interface ISetListRepository
{
    void Add(SetList setList);
    void Remove(Guid id);
}
