using Kmk.Api.Application.Users;
using Kmk.Api.Domain.Channels;
using Kmk.Api.Domain.Users;
using Kmk.Api.Persistence.Repositories;

namespace Kmk.Api.Application.Channels;

public class ChannelService
{
    ChannelRepository _channelRepository;
    UserService _userService;

    public ChannelService(UserService userService, ChannelRepository channelRepository)
    {
        _userService = userService;
        _channelRepository = channelRepository;
    }

    public List<Channel> GetChannels()
    {
        return _channelRepository.GetChannels();
    }

    public List<Channel> GetChannelsOfUser(Guid userId)
    {
        return _channelRepository.GetChannelsOfUser(userId);
    }

    public Channel GetChannel(Guid channelId) 
    {
        return _channelRepository.GetChannel(channelId);
    }

    public Channel GetChannelByName(string name)
    {
        return _channelRepository.GetChannelByName(name);
    }

    public List<Channel> GetDefaultChannels()
    {
        return _channelRepository.GetDefaultChannels();
    }

    public List<Post> GetMessages(Guid channelId)
    {
        return _channelRepository.GetMessages(channelId);
    }

    public Channel CreateChannel(string name)
    {
        Channel channel = new Channel(name);
        _channelRepository.AddChannel(channel);
        return channel;
    }

    public void DeleteChannel(Guid channelId) 
    {
        _channelRepository.RemoveChannel(channelId);
    }

    public void SendMessage(Guid channelId, Guid userId, string message)
    {
        Channel channel = _channelRepository.GetChannel(channelId);

        User user = _userService.GetUser(userId);

        Post post = new Post(channel, user, message);

        channel.Posts.Add(post);

        _channelRepository.AddMessage(post);
    }

    public void AddUserToDefaultChannels(User user)
    {
        List<Channel> defaultChannels = GetDefaultChannels();

        defaultChannels.ForEach(channel => channel.AddMember(user));
    }
}
