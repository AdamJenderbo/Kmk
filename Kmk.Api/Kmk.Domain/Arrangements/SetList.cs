namespace Kmk.Domain.Arrangements;

public class SetList
{
    public Guid Id { get; private set; }
    public string Name { get; private set; }
    public bool Active { get; private set; }
    public List<Arrangement> Arrangements { get; set; }

    public SetList(string name)
    {
        Id = Guid.NewGuid();
        Name = name;
        Active = false;
        Arrangements = new List<Arrangement>();
    }

    public void Activate()
    {
        Active = true;
    }

    public void Deactivate() 
    {
        Active = false;
    }

    public void AddArrangement(Arrangement arrangement)
    {
        Arrangements.Add(arrangement);
    }

    public void RemoveArrangement(Arrangement arrangement)
    {
        Arrangements.Remove(arrangement);
    }
}
