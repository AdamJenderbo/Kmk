using Kmk.Domain.Users;
using Microsoft.AspNetCore.Authorization;

namespace Kmk.Infrastructure.Authorization;

public class HasRoleAttribute : AuthorizeAttribute
{
    public HasRoleAttribute(Role role)
        : base(policy: role.ToString())
    {

    }
}