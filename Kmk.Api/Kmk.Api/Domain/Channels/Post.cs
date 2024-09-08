using Kmk.Api.Domain.Users;

namespace Kmk.Api.Domain.Channels;

public class Post
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public User User { get; set; }
    public string Message { get; set; }
    public DateTime Created { get; set; }
    public Guid ChannelId { get; set; }

    private Post() { }

    public Post(Channel channel, User user, string message)
    {
        Id = Guid.NewGuid();
        ChannelId = channel.Id;
        User = user;    
        Message = message;
        Created = DateTime.Now;
    }
}