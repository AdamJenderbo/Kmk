namespace Kmk.Application.Notifications.ViewModels;

public class NotificationViewModel
{
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

    public bool IsRead { get; set; }
}
