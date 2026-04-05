using Kmk.Application.Notifications.Services;
using Kmk.Domain.Users.Events;
using MediatR;

namespace Kmk.Application.Users.Events;

/// <summary>
/// Skickar notifikation till användare om att den blivit godkänd
/// </summary>
public class UserApproved_NotifyUser(
    INotificationService _notificationService, 
    IUnitOfWork _unitOfWork) : INotificationHandler<UserApprovedEvent>
{
    public async Task Handle(UserApprovedEvent e, CancellationToken cancellationToken)
    {
        _notificationService.Send(
            title: "Din ansökan har blivit godkänd", 
            message: "Din ansökan om att gå med i Kungälvs musikkår har blivit godkänd", 
            e.User);

        await _unitOfWork.Save();
    }
}