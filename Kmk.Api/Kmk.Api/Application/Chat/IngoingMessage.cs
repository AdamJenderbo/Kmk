using Kmk.Api.Domain.Users;

namespace Kmk.Api.Application.Chat;

public class IngoingMessage
{
    public Guid ChannelId { get; set; }
    public Guid UserId { get; set; }
    public string Text { get; set; } = string.Empty;
}