using Kmk.Domain.Users;
using Microsoft.AspNetCore.Authorization;

namespace Kmk.Infrastructure.Authorization;

public class RoleRequirement : IAuthorizationRequirement
{
    public Role Role { get; set; }

    public RoleRequirement(string role)
    {
        Role = Parse(role);
    }

    private Role Parse(string role)
    {
        Role parsedRole;

        Enum.TryParse(role, out parsedRole);

        return parsedRole;
    }
}