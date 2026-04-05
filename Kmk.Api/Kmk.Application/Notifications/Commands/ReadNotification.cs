namespace Kmk.Application.Notifications.Commands;

/// <summary>
/// Markerar notifikation som läst för en användare
/// </summary>
public record ReadNotification(Guid NotificationId, Guid UserId);