using Kmk.Application.Notifications.Services;
using Kmk.Domain.Arrangements;
using Kmk.Domain.Users;
using MediatR;

namespace Kmk.Application.Arrangements.Events;

/// <summary>
/// Skickar notifikation till alla godkända användare om att ett nytt arrangemang har skapats
/// </summary>
public class ArrangementCreated_NotifyUsers(
    INotificationService _notificationService,
    IUserRepository _userRepository,
    IUnitOfWork _unitOfWork) : INotificationHandler<ArrangementCreatedEvent>
{
    public async Task Handle(ArrangementCreatedEvent notification, CancellationToken cancellationToken)
    {
        var users = await _userRepository.List();

        _notificationService.Send(
            title: "Nytt arrangemang tillagt",
            message: $"Arrangemanget {notification.Arrangement.Title} har lagts till",
            users);

        await _unitOfWork.Save();
    }
}