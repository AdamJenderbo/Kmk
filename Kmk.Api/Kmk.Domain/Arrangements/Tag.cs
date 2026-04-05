namespace Kmk.Domain.Arrangements;

public class Tag
{
    public Guid Id { get; private set; }
    public string Name { get; private set; }

    public Tag(string name)
    {
        Id = Guid.NewGuid();
        Name = name;
    }
}