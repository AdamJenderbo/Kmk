using Kmk.Application.Users.Commands;
using Kmk.Application.Users.Queries;
using Kmk.Domain.Users;
using Kmk.Infrastructure.Authorization;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Kmk.Api.Controllers;

[ApiController]
[Route("api/user")]
public class UserController(IMediator _mediator) : ControllerBase
{
    [HttpPost]
    [Route("list")]
    public Task<List<User>> List(ListUsersQuery request)
    {
        return _mediator.Send(request);
    }

    [HttpPost]
    [Route("login")]
    [AllowAnonymous]
    public async Task<LoginUserResponse> Login(LoginUser request)
    {
        return await _mediator.Send(request);
    }

    [HttpPost]
    [Route("register")]
    [AllowAnonymous]
    public async Task<User> Register(RegisterUser request)
    {
        return await _mediator.Send(request);
    }

    [HttpGet]
    [Route("unapproved")]
    [HasRole(Role.BoardDeputy)]
    public async Task<List<User>> GeUnapproved()
    {
        return await _mediator.Send(new ListUsersQuery(Filter: "", Appproved: false));
    }

    [HttpPost]
    [Route("approve/{id}")]
    [HasRole(Role.BoardDeputy)]
    public async Task Approve(Guid id)
    {
        await _mediator.Send(new ApproveUser(id));
    }
}