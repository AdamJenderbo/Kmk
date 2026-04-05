using Kmk.Application.Notifications.Services;
using Kmk.Application.Notifications.ViewModels;
using MediatR;

namespace Kmk.Application.Notifications.Queries;

public record GetNotificationsQuery(Guid UserId) : IRequest<List<NotificationViewModel>>;

public class GetNotificationsQueryHandler(INotificationService _notificationService) : IRequestHandler<GetNotificationsQuery, List<NotificationViewModel>>
{
    public Task<List<NotificationViewModel>> Handle(GetNotificationsQuery request, CancellationToken cancellationToken)
    {
        return Task.FromResult(_notificationService.GetByUserId(request.UserId));
    }
}