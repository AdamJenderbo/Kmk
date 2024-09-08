using Kmk.Api.Domain.Users;

namespace Kmk.Api.Application.Authentication.Responses;

public class AuthenticationResponse
{
    public bool IsSuccess { get; set; }
    public string? Message { get; set; }
    public string? Token { get; set; }
    public User? User { get; set; }

    public static AuthenticationResponse Success(User user, string token)
    {
        return new AuthenticationResponse
        {
            User = user,
            Token = token,
            IsSuccess = true
        };
    }

    public static AuthenticationResponse Failure(string message)
    {
        return new AuthenticationResponse
        {
            IsSuccess = false,
            Message = message
        };
    }

}