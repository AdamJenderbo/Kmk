using Kmk.Api.Application.Authentication;
using Kmk.Api.Application.Authentication.Requests;
using Kmk.Api.Application.Authentication.Responses;
using Kmk.Api.Application.Users;
using Kmk.Api.Domain.Users;
using Kmk.Api.Infrastructure.Authorization;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Kmk.Api.Api.Controllers;

[ApiController]
[Route("api/user")]
public class UserController : ControllerBase
{
    UserService _userService;

    public UserController(UserService userService) 
    {
        _userService = userService;
    }

    [HttpGet]
    [Route("ping")]
    public bool Ping() => true;

    [HttpPost]
    [Route("list")]
    public List<User> GetUsers(GetUsersRequest request)
        => _userService.GetUsers(request);

    [HttpPost]
    [Route("login")]
    [AllowAnonymous]
    public AuthenticationResponse Login(LoginRequest request, [FromServices] AuthenticationService service)
    {
        try
        {
            return service.Login(request);
        }
        catch (Exception ex) 
        {
            return AuthenticationResponse.Failure(ex.Message);
        }
    }

    [HttpPost]
    [Route("register")]
    [AllowAnonymous]
    public RegisterUserResponse RegisterUser(RegisterUserRequest request)
    {
        try
        {
            return _userService.RegisterUser(request);
        }
        catch(Exception ex) 
        {
            return RegisterUserResponse.Failure(ex.Message);
        }
    }


    [HttpGet]
    [Route("unapproved")]
    [HasRole(Role.BoardDeputy)]
    public List<User> GeUnapprovedtUsers()
        => _userService.GetUnapprovedUsers();


    [HttpPost]
    [Route("approve/{userId}")]
    [HasRole(Role.BoardDeputy)]
    public void ApproveUser(Guid userId)
        => _userService.ApproveUser(userId);
}