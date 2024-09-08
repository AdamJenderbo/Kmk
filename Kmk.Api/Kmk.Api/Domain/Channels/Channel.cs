
using Kmk.Api.Domain.Users;

namespace Kmk.Api.Domain.Channels;

public class Channel
{
    public Guid Id { get; private set; }
    public string Name { get; private set; }
    public List<User> Members { get; private set; }

    public List<Post> Posts { get; private set; }

    private Channel() { }

    public Channel(string name)
    {
        Id = Guid.NewGuid();
        Name = name;
        Posts = new List<Post>();
        Members = new List<User>();
    }

    public void Send(User user, string message)
    {
        //if (!Members.Any(x => x.Id == userId))
        //    throw new Exception("Cannot post to channel. User not member of channel");

        Posts.Add(new Post(this, user, message));
    }

    public void AddMember(User user)
    {
        Members.Add(user);
    }
}