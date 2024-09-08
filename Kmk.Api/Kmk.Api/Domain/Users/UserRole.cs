namespace Kmk.Api.Domain.Users;

public class UserRole
{
    public Guid UserId { get; set; }
    public Role Role { get; set; }
}