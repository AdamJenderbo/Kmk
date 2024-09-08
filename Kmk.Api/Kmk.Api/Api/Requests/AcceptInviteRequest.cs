namespace Kmk.Api.Api.Requests;

public class AcceptInviteRequest
{
    public Guid EventId { get; set; }
    public Guid UserId { get; set; }
}
