using Kmk.Domain.Notifications;
using Microsoft.EntityFrameworkCore;

namespace Kmk.Infrastructure.Database.Repositories;

public class NotificationRepository(KmkContext _db) : INotificationRepository
{
    /// <summary>
    /// Lägger till notifikation
    /// </summary>
    /// <param name="notification"></param>
    public void Add(Notification notification)
    {
        _db.Notification.Add(notification);
    }

    /// <summary>
    /// Läser upp notifikation via id
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    public Notification? GetById(Guid id)
    {
        return _db.Notification
            .Include(x => x.NotifiedUsers)
            .SingleOrDefault(x => x.Id == id);
    }

    /// <summary>
    /// Läser upp notifikationer via användarid. Exkluderar raderade notifikationer
    /// </summary>
    /// <param name="userId"></param>
    /// <returns></returns>
    public List<NotificationUser> GetByUserId(Guid userId)
    {
        return _db.NotificationUser
            .Include(x => x.Notification)
            .Where(x => x.UserId == userId && !x.IsDeleted)
            .ToList();
    }
}