namespace Kmk.Api.Application.Chat;

public interface IChannelClient
{
    public Task ReceiveMessage(OutgoingMessage message);
}