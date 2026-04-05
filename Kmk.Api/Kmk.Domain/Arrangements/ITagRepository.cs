namespace Kmk.Domain.Arrangements;

public interface ITagRepository
{
    void Add(Tag tag);
    void Remove(Guid id);
}