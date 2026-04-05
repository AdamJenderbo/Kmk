using Kmk.Domain.Notifications.Events;
using Kmk.Domain.Users;

namespace Kmk.Domain.Notifications;

public class Notification
{
    /// <summary>
    /// Id
    /// </summary>
    public Guid Id { get; set; }

    /// <summary>
    /// Datum då notifikationen skapats
    /// </summary>
    public DateTime Created { get; set; }

    /// <summary>
    /// Titel
    /// </summary>
    public string Title { get; set; } = string.Empty;

    /// <summary>
    /// Meddelande
    /// </summary>
    public string Message { get; set; } = string.Empty;

    /// <summary>
    /// Användare som blivit notifierade
    /// </summary>
    public List<NotificationUser> NotifiedUsers { get; set; }

    public Notification(string title, string message) 
    {
        Id = Guid.NewGuid();
        Created = DateTime.Now;
        Title = title;
        Message = message;
        NotifiedUsers = new List<NotificationUser>();
    }

    /// <summary>
    /// Notifierar användare
    /// </summary>
    /// <param name="user"></param>
    public void Notify(User user)
    {
        if (NotifiedUsers.Any(x => x.UserId == user.Id))
            return;

        NotifiedUsers.Add(new NotificationUser(Id, user.Id));

        //RaiseEvent(new UserNotifiedEvent(this, user));
    }

    /// <summary>
    /// Läser notifikation
    /// </summary>
    /// <param name="userId"></param>
    /// <exception cref="Exception"></exception>
    public void Read(Guid userId)
    {
        var notificationUser = NotifiedUsers.SingleOrDefault(x => x.UserId == userId);

        if(notificationUser == null)
            throw new Exception("Kan inte läsa notifikation. Användaren är inte notifierad");

        notificationUser.Read();
    }

    /// <summary>
    /// Raderar notifikation för en viss användare
    /// </summary>
    /// <param name="userId"></param>
    /// <exception cref="Exception"></exception>
    public void Delete(Guid userId)
    {
        var notificationUser = NotifiedUsers.SingleOrDefault(x => x.UserId == userId);

        if (notificationUser == null)
            throw new Exception("Kan inte ta bort notifikation. Användaren är inte notifierad");

        notificationUser.Delete();
    }
}