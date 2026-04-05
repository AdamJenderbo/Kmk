namespace Kmk.Domain.Notifications;

public class NotificationUser
{
    public Guid NotificationId { get; set; }
    public Guid UserId { get; set; }
    public bool IsRead {  get; set; }
    public bool IsDeleted { get; set; }
    public Notification Notification { get; set; }

    public NotificationUser(Guid notificationId, Guid userId)
    {
        NotificationId = notificationId;
        UserId = userId;
        IsRead = false;
        IsDeleted = false;
    }

    public void Read()
    {
        IsRead = true;
    }

    public void Delete()
    {
        IsDeleted = true;
    }
}