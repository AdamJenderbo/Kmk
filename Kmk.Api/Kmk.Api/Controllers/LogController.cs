using Kmk.Application.Logging.Queries;
using Kmk.Domain.Logging;
using Kmk.Domain.Users;
using Kmk.Infrastructure.Authorization;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Kmk.Api.Controllers;

[ApiController]
[Route("api/log")]
public class LogController(IMediator _mediator) : ControllerBase
{
    [HttpGet]
    [HasRole(Role.Admin)]
    public async Task<List<LogMessage>> Get()
    {
        return await _mediator.Send(new GetLogQuery());
    }
}