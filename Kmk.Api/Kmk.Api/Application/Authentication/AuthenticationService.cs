using Kmk.Api.Application.Authentication.Requests;
using Kmk.Api.Application.Authentication.Responses;
using Kmk.Api.Application.Users;
using Kmk.Api.Domain.Users;
using System.Security.Cryptography;
using System.Text;

namespace Kmk.Api.Application.Authentication;

public class AuthenticationService
{
    IJwtProvider _jwtProvider;
    UserService _userService;

    public AuthenticationService(UserService userService, IJwtProvider jwtProvider)
    {
        _userService = userService;
        _jwtProvider = jwtProvider;
    }

    public AuthenticationResponse Login(LoginRequest request)
    {
        User? user = _userService.GetUserByEmail(request.Email);

        if (user is null)
            return AuthenticationResponse.Failure("Kan inte logga in. Finns ingen användare med email " + request.Email);

        if(user.Password != HashPassword(request.Password))
            return AuthenticationResponse.Failure("Kan inte logga in. Felaktigt lösenord");

        string token = _jwtProvider.Generate(user);

        return AuthenticationResponse.Success(user, token);
    }

    public static string HashPassword(string password)
    {
        using (SHA256 sha256Hash = SHA256.Create())
        {
            byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(password));

            StringBuilder builder = new StringBuilder();
            for (int i = 0; i < bytes.Length; i++)
            {
                builder.Append(bytes[i].ToString("x2"));
            }

            return builder.ToString();
        }
    }
}