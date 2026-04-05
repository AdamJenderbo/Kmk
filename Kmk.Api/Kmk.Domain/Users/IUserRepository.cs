using System.Linq.Expressions;

namespace Kmk.Domain.Users;

public interface IUserRepository
{
    void Add(User user);
    Task<bool> Any(Expression<Func<User, bool>> predicate);
    IQueryable<User> CreateQuery();
    Task<List<User>> List();
    Task<List<User>> GetBoardMembers();
    Task<User?> GetByEmail(string email);
    Task<User> GetById(Guid id);
}