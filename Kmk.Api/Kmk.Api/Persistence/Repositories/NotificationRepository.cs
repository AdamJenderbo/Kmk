using Kmk.Api.Domain.Notifications;
using Kmk.Persistence;

namespace Kmk.Api.Persistence.Repositories;

public class NotificationRepository
{
    KmkContext _context;

    public NotificationRepository(KmkContext context)
    {
        _context = context;
    }

    public Notification GetNotification(Guid id)
    {
        return _context.Notification.Single(x => x.Id == id);
    }

    public List<Notification> GetNotificationsOfUser(Guid userId)
    {
        return _context.Notification.Where(x => x.UserId == userId).ToList();
    }

    public void AddNotification(Notification notification)
    {
        _context.Notification.Add(notification);
    }

    public void RemoveNotification(Guid id)
    {
        var notification = _context.Notification.Single(x => x.Id == id);
        _context.Notification.Remove(notification);
    }
}