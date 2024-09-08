using Kmk.Api.Application.Notifications;
using Kmk.Api.Domain.Notifications;
using Kmk.Api.Persistence;
using Microsoft.AspNetCore.Mvc;

namespace Kmk.Api.Api.Controllers;

[ApiController]
[Route("api/notification")]
public class NotificationController : ControllerBase
{
    NotificationService _notificationService;
    UnitOfWork _unitOfWork;

    public NotificationController(NotificationService notificationService, UnitOfWork unitOfWork) 
    {
        _notificationService = notificationService;
        _unitOfWork = unitOfWork;
    }

    [HttpGet]
    public List<Notification> GetNotifications()
    {
        Token? token = Request.GetToken();

        if (token is null)
            throw new UnauthorizedAccessException();

        return _notificationService.GetNotificationsOfUser(token.UserId);
    }

    [HttpGet]
    [Route("{id}")]
    public Notification GetNotification(Guid id)
    {
        Token? token = Request.GetToken();

        if (token is null)
            throw new UnauthorizedAccessException();

        var notifiaction = _notificationService.GetNotification(id, token.UserId);

        _unitOfWork.Save();

        return notifiaction;
    }
}