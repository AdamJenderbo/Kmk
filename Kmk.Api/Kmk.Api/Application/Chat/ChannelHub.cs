using Kmk.Api.Application.Channels;
using Kmk.Api.Application.Users;
using Kmk.Api.Domain.Channels;
using Kmk.Api.Domain.Users;
using Kmk.Api.Persistence;
using Microsoft.AspNetCore.SignalR;

namespace Kmk.Api.Application.Chat;

public class ChannelHub : Hub<IChannelClient>
{
    UserService _userService;
    ChannelService _channelService;
    UnitOfWork _unitOfWork;

    public ChannelHub(ChannelService channelService, UserService userService, UnitOfWork unitOfWork)
    {
        _channelService = channelService;
        _userService = userService;
        _unitOfWork = unitOfWork;
    }

    public async Task SendMessage(IngoingMessage message)
    {
        // Spara i databas
        _channelService.SendMessage(message.ChannelId, message.UserId, message.Text);
        _unitOfWork.Save();

        // Skicka meddelande till alla uppkopplade användare
        User user = _userService.GetUser(message.UserId);
        await Clients.All.ReceiveMessage(new OutgoingMessage(message.ChannelId, user, message.Text));
    }
}