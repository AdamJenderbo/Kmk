using Kmk.Api.Domain.Users;

namespace Kmk.Api.Application.Authentication.Responses;

public class RegisterUserResponse
{
    public bool IsSuccess { get; set; }
    public User? User { get; set; }
    public string? Message { get; set; }
    public static RegisterUserResponse Success(User user)
    {
        return new RegisterUserResponse { IsSuccess = true, User = user };
    }
    public static RegisterUserResponse Failure(string message)
    {
        return new RegisterUserResponse { IsSuccess = false, Message = message };
    }
}