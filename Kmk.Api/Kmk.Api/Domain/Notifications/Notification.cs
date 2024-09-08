namespace Kmk.Api.Domain.Notifications;

public class Notification
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public DateTime Created { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public bool Read { get; set; }

    public Notification(Guid userId, string title, string description)
    {
        Id = Guid.NewGuid();
        UserId = userId;
        Created = DateTime.Now;
        Title = title;
        Description = description;
        Read = false;
    }

    public void MarkAsRead()
    {
        Read = true;
    }
}
