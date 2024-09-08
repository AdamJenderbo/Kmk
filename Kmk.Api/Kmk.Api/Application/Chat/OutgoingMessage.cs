using Kmk.Api.Domain.Users;

namespace Kmk.Api.Application.Chat;

public class OutgoingMessage
{
    public Guid ChannelId { get; set; }
    public DateTime Created { get; set; }
    public User User { get; set; }
    public string Text { get; set; } = string.Empty;

    public OutgoingMessage(Guid channelId, User user, string text)
    {
        ChannelId = channelId;
        Created = DateTime.Now;
        Text = text;
        User = user;
    }
}