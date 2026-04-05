using Kmk.Domain.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.DependencyInjection;

namespace Kmk.Infrastructure.Authorization;

public class RoleAuthorizationHandler : AuthorizationHandler<RoleRequirement>
{
    IServiceScopeFactory _serviceScopeFactory;

    public RoleAuthorizationHandler(IServiceScopeFactory serviceScopeFactory)
    {
        _serviceScopeFactory = serviceScopeFactory;
    }

    protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, RoleRequirement requirement)
    {
        var claim = context.User.Claims.FirstOrDefault(x => x.Type == "id");

        Guid? userId = claim != null ? new Guid(claim.Value) : null;

        if(userId is null)
            return;

        using IServiceScope scope = _serviceScopeFactory.CreateScope();

        var userRepository = scope.ServiceProvider.GetRequiredService<IUserRepository>();

        var user = await userRepository.GetById(userId.Value);

        if (user.IsRole(Role.Admin) || user.IsRole(requirement.Role))
            context.Succeed(requirement);
    }
}
