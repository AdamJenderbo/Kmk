namespace Kmk.Api.Api.Requests;

public class DeclineInviteRequest
{
    public Guid EventId { get; set; }
    public Guid UserId { get; set; }
}