using Kmk.Application.Users.Services;
using Kmk.Domain.Users;
using MediatR;

namespace Kmk.Application.Users.Commands;

/// <summary>
/// Loggar in användare
/// </summary>
public record LoginUser(string Email, string Password) : IRequest<LoginUserResponse>;

public class LoginUserHandler(
    IUserRepository _userRepository, 
    ICryptographyService _cryptographyService, 
    ITokenGenerator _tokenGenerator) : IRequestHandler<LoginUser, LoginUserResponse>
{
    public async Task<LoginUserResponse> Handle(LoginUser request, CancellationToken cancellationToken)
    {
        var user = await _userRepository.GetByEmail(request.Email);

        if (user is null)
            throw new Exception("Kan inte logga in. Finns ingen användare med email " + request.Email);

        var hashedPassword = _cryptographyService.Hash(request.Password);

        if (user.Password != hashedPassword)
            throw new Exception("Kan inte logga in. Felaktigt lösenord");

        string token = _tokenGenerator.Generate(user);

        return new LoginUserResponse
        {
            Token = token,
            User = user
        };
    }
}

public class LoginUserResponse
{
    public string Token { get; set; } = string.Empty;
    public required User User { get; set; }
}