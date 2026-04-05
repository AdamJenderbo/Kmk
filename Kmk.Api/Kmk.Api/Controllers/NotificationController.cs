using Kmk.Application.Notifications.Commands;
using Kmk.Application.Notifications.Queries;
using Kmk.Application.Notifications.ViewModels;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Kmk.Api.Controllers;

[ApiController]
[Route("api/notification")]
public class NotificationController(IMediator _mediator) : ControllerBase
{
    [HttpGet]
    [Route("{userId}")]
    public Task<List<NotificationViewModel>> Get(Guid userId)
    {
        return _mediator.Send(new GetNotificationsQuery(userId));
    }

    [HttpPost]
    [Route("read")]
    public async Task Read(ReadNotifications request)
    {
        await _mediator.Send(request);
    }
}