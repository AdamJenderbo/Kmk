using Kmk.Api.Domain.Users;

namespace Kmk.Api.Domain.Calendar;

public class Invite
{
    public Guid EventId { get; set; }
    public Guid UserId { get; set; }
    public User User { get; set; }
    public InviteStatus? Status { get; set; }

    private Invite() { }

    public Invite(Event @event, User user)
    {
        EventId = @event.Id;
        User = user;
        Status = null;
    }

    public void Accept()
    {
        Status = InviteStatus.Accepted;
    }

    public void Decline()
    {
        Status = InviteStatus.Declined;
    }
}
