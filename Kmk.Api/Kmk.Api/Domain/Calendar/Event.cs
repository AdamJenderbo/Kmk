using Kmk.Api.Domain.Users;

namespace Kmk.Api.Domain.Calendar;

public class Event
{
    public Guid Id { get; set; }
    public DateTime Date { get; set; }
    public EventStatus Status { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public DateTime Created { get; set; }
    public User CreatedBy { get; set; }
    public DateTime Changed { get; set; }
    public User ChangedBy { get; set; }
    public List<Invite> Invites { get; set; }

    private Event() { }

    public Event(
        DateTime date, 
        string title, 
        string description,
        string location,
        User createdBy)
    {
        if (date < DateTime.Now)
            throw new Exception("Kan inte skapa evennemang. Evenemang har redan hänt.");

        Id = Guid.NewGuid();
        Date = date;
        Status = EventStatus.Upcomming;
        Title = title;
        Description = description;
        Location = location;
        Created = DateTime.Now;
        CreatedBy = createdBy;
        Changed = DateTime.Now;
        ChangedBy = createdBy;
        Invites = new List<Invite>();
    }

    public void Cancel()
    {
        Status = EventStatus.Canceled;
    }

    public void Invite(User user)
    {
        Invites.Add(new Invite(this, user));
    }

    public void AcceptInvite(User user)
    {
        Invite? invite = Invites.SingleOrDefault(x => x.User == user);

        if (invite is null)
            throw new Exception("Kan inte acceptera inbjudan. Medlem inte inbjuden.");

        invite.Accept();
    }

    public void DeclineInvite(User user)
    {
        Invite? invite = Invites.SingleOrDefault(x => x.User == user);

        if (invite is null)
            throw new Exception("Kan inte avböja inbjudan. Medlem inte inbjuden.");

        invite.Decline();
    }
}
