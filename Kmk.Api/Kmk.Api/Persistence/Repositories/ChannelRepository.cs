using Kmk.Api.Domain.Channels;
using Kmk.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Kmk.Api.Persistence.Repositories;

public class ChannelRepository
{
    KmkContext _context;

    public ChannelRepository(KmkContext context)
    {
        _context = context;
    }

    public List<Channel> GetChannels()
    {
        return _context.Channel.ToList();
    }

    public List<Channel> GetChannelsOfUser(Guid userId)
    {
        return _context.Channel
            .Include(x => x.Members)
            .Where(x => x.Members.Any(x => x.Id == userId))
            .ToList();
    }

    public Channel GetChannel(Guid id)
    {
        Channel? channel = _context.Channel
            .Include(x => x.Posts.OrderBy(y => y.Created))
            .Include(x => x.Members)
            .SingleOrDefault(x => x.Id == id);

        if (channel == null)
            throw new Exception("Cannot get channel. Channel does not exist.");

        return channel;
    }

    public Channel GetChannelByName(string name)
    {
        Channel? channel = _context.Channel
            .Include(x => x.Posts)
            .Include(x => x.Members)
            .SingleOrDefault(x => x.Name == name);

        if (channel == null)
            throw new Exception("Cannot get channel by name. No channel with that name exists.");

        return channel;
    }

    public List<Channel> GetDefaultChannels()
    {
        List<string> defaultChannelNames = new List<string>
        {
            "Allmänt",
            "Information"
        };

        return _context.Channel
            .Include(channel => channel.Members)
            .Where(channel => defaultChannelNames.Contains(channel.Name))
            .ToList();
    }

    public void AddChannel(Channel channel)
    {
        _context.Channel.Add(channel);
    }

    public void RemoveChannel(Guid id)
    {
        Channel channel = GetChannel(id);

        if (channel is null)
            throw new Exception("Kan inte ta bort kanal. Kanal finns inte");

        _context.Channel.Remove(channel);
    }

    public List<Post> GetMessages(Guid channelId)
    {
        return _context.Post
            .Include(x => x.User)
            .Where(x => x.ChannelId == channelId)
            .ToList();
    }

    public void AddMessage(Post post)
    {
        _context.Post.Add(post);
    }
}