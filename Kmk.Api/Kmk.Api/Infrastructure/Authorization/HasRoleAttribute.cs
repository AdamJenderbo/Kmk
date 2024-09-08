using Kmk.Api.Domain.Users;
using Microsoft.AspNetCore.Authorization;

namespace Kmk.Api.Infrastructure.Authorization;

public class HasRoleAttribute : AuthorizeAttribute
{
    public HasRoleAttribute(Role role)
        : base(policy: role.ToString())
    {

    }
}