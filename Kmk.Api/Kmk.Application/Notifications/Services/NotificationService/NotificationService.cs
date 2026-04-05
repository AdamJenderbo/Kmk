using Kmk.Application.Notifications.ViewModels;
using Kmk.Domain.Notifications;
using Kmk.Domain.Users;

namespace Kmk.Application.Notifications.Services.NotificationService;

public class NotificationService(INotificationRepository _notificationRepository) : INotificationService
{
    /// <summary>
    /// Läser upp notifikationer tillhörande en användare
    /// </summary>
    /// <param name="userId"></param>
    /// <returns></returns>
    public List<NotificationViewModel> GetByUserId(Guid userId)
    {
        var notifications = _notificationRepository.GetByUserId(userId);

        return notifications.Select(x => new NotificationViewModel
        {
            Id = x.NotificationId,
            Created = x.Notification.Created,
            Title = x.Notification.Title,
            Message = x.Notification.Message,
            IsRead = x.IsRead
        }).ToList();
    }

    /// <summary>
    /// Raderar notifikation
    /// </summary>
    /// <param name="notificationId"></param>
    /// <param name="userId"></param>
    /// <exception cref="Exception"></exception>
    public void Delete(Guid notificationId, Guid userId)
    {
        var notification = _notificationRepository.GetById(notificationId);

        if (notification is null)
            throw new Exception("Kan inte ta bort notifikation. Notifikation finns inte");

        notification.Delete(userId);
    }

    /// <summary>
    /// Läser notifikation
    /// </summary>
    /// <param name="notificationId"></param>
    /// <param name="userId"></param>
    /// <exception cref="Exception"></exception>
    public void Read(Guid notificationId, Guid userId)
    {
        var notification = _notificationRepository.GetById(notificationId);

        if (notification is null)
            throw new Exception("Kan inte läsa notifikation. Notifikation finns inte");

        notification.Read(userId);
    }

    /// <summary>
    /// Läser flera notifikationer
    /// </summary>
    /// <param name="notificationIds"></param>
    /// <param name="userId"></param>
    public void Read(List<Guid> notificationIds, Guid userId)
    {
        foreach (var notificationId in notificationIds)
            Read(notificationId, userId);
    }

    /// <summary>
    /// Skickar notifikation till användare
    /// </summary>
    /// <param name="title"></param>
    /// <param name="message"></param>
    /// <param name="user"></param>
    public void Send(string title, string message, User user)
    {
        Send(title, message, new List<User> { user });
    }

    /// <summary>
    /// Skickar notifikation till flera användare
    /// </summary>
    /// <param name="title"></param>
    /// <param name="message"></param>
    /// <param name="users"></param>
    public void Send(string title, string message, List<User> users)
    {
        var notification = new Notification(title, message);

        foreach (var user in users)
            notification.Notify(user);

        _notificationRepository.Add(notification);
    }
}