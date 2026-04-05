using Kmk.Domain.Users;
using MediatR;

namespace Kmk.Application.Users.Queries;

public record ListUsersQuery(string Filter, bool? Appproved) : IRequest<List<User>>;

public class ListUsersQueryHandler(IUserRepository _userRepository) : IRequestHandler<ListUsersQuery, List<User>>
{
    public Task<List<User>> Handle(ListUsersQuery request, CancellationToken cancellationToken)
    {
        var query = _userRepository.CreateQuery();

        if (request.Appproved is not null)
            query = query.Where(x => x.Approved == request.Appproved);

        query = query.Where(x =>
                    x.FirstName.Contains(request.Filter) ||
                    x.LastName.Contains(request.Filter));

        return Task.FromResult(query.ToList());
    }
}
