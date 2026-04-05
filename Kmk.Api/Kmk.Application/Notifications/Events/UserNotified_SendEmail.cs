using Kmk.Application.Notifications.Services;
using Kmk.Domain.Emails;
using Kmk.Domain.Notifications.Events;
using MediatR;

namespace Kmk.Application.Notifications.Events;

/// <summary>
/// Skickar email notifikation till användare
/// </summary>
public class UserNotified_SendEmail(IEmailService _emailService) : INotificationHandler<UserNotified>
{
    public Task Handle(UserNotified e, CancellationToken cancellationToken)
    {
        _emailService.Send(new Email
        {
            To = e.User.Email,
            From = "noreply@kungalvsmusikkar.se",
            Subject = e.Notification.Title,
            Body = e.Notification.Message
        });

        return Task.CompletedTask;
    }
}