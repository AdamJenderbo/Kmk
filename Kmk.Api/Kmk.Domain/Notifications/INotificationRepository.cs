namespace Kmk.Domain.Notifications;

public interface INotificationRepository
{
    void Add(Notification notification);
    Notification? GetById(Guid id);
    List<NotificationUser> GetByUserId(Guid userId);
}