using Kmk.Domain.Users;

namespace Kmk.Application.Users;

public interface ITokenGenerator
{
    string Generate(User user);
}