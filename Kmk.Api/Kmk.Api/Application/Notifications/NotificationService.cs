using Kmk.Api.Domain.Notifications;
using Kmk.Api.Persistence.Repositories;

namespace Kmk.Api.Application.Notifications;

public class NotificationService
{
    NotificationRepository _repository;

    public NotificationService(NotificationRepository repository)
    {
        _repository = repository;
    }

    public List<Notification> GetNotificationsOfUser(Guid userId)
    {
        return _repository.GetNotificationsOfUser(userId);
    }

    public Notification GetNotification(Guid nnotificationId, Guid userId)
    {
        var notification = _repository.GetNotification(nnotificationId);

        if (notification.UserId != userId)
            throw new UnauthorizedAccessException();

        notification.MarkAsRead();

        return notification;
    }

    public void SendNotification(Guid userId, string title, string description)
    {
        Notification notification = new Notification(userId, title, description);

        _repository.AddNotification(notification);
    }
}
