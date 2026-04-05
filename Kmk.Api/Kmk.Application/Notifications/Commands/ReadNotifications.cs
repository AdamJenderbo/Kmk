using Kmk.Application.Notifications.Services;
using MediatR;

namespace Kmk.Application.Notifications.Commands;

public record ReadNotifications(List<Guid> NotificationIds, Guid UserId) : IRequest;

public class ReadNotificationsHandler(
    INotificationService _notificationService, 
    IUnitOfWork _unitOfWork) : IRequestHandler<ReadNotifications>
{
    public async Task Handle(ReadNotifications request, CancellationToken cancellationToken)
    {
        _notificationService.Read(request.NotificationIds, request.UserId);
        await _unitOfWork.Save();
    }
}