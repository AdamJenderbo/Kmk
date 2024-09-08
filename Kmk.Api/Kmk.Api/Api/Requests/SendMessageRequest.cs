namespace Kmk.Api.Api.Requests;

public class SendMessageRequest
{
    public Guid ChannelId { get; set; }
    public Guid UserId { get; set; }
    public string Message { get; set; } = string.Empty;
}
