using System.IdentityModel.Tokens.Jwt;

namespace Kmk.Api.Api;

public static class RequestExtensions
{
    public static Token? GetToken(this HttpRequest request)
    {
        var authHeader = request.Headers["Authorization"].ToString();

        if (!string.IsNullOrEmpty(authHeader) && authHeader.StartsWith("Bearer "))
        {
            string token = authHeader.Substring("Bearer ".Length).Trim();

            JwtSecurityTokenHandler handler = new JwtSecurityTokenHandler();
            JwtSecurityToken? jsonToken = handler.ReadToken(token) as JwtSecurityToken;

            if (jsonToken != null)
            {
                var claims = jsonToken.Claims;

                string? userId = claims.FirstOrDefault(c => c.Type == "id")?.Value;

                if (userId is null)
                    return null;

                return new Token
                {
                    UserId = new Guid(userId)
                };
            }

            return null;
        }

        return null;
    }
}