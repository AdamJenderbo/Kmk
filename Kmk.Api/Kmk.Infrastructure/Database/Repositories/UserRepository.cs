using Kmk.Domain.Users;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Kmk.Infrastructure.Database.Repositories;

public class UserRepository(KmkContext _context) : IUserRepository
{
    /// <summary>
    /// Lägger till användare
    /// </summary>
    /// <param name="user"></param>
    public void Add(User user)
    {
        _context.User.Add(user);
    }

    /// <summary>
    /// Kollar ifall någon användare uppfyller predikatet
    /// </summary>
    /// <param name="predicate"></param>
    /// <returns></returns>
    public async Task<bool> Any(Expression<Func<User, bool>> predicate)
    {
        return await _context.User.AnyAsync(predicate);
    }

    /// <summary>
    /// Skapar fråga
    /// </summary>
    /// <returns></returns>
    public IQueryable<User> CreateQuery()
    {
        return _context.User
            .Include(x => x.Roles)
            .OrderBy(x => x.LastName);
    }

    /// <summary>
    /// Listar alla användare
    /// </summary>
    /// <returns></returns>
    public async Task<List<User>> List()
    {
        return await CreateQuery().ToListAsync();
    }

    /// <summary>
    /// Läser upp styrelsen
    /// </summary>
    /// <returns></returns>
    public async Task<List<User>> GetBoardMembers()
    {
        return await CreateQuery()
            .Where(user => user.IsBoardMember())
            .ToListAsync();
    }

    /// <summary>
    /// Läser upp användare via email
    /// </summary>
    /// <param name="email"></param>
    /// <returns></returns>
    public async Task<User?> GetByEmail(string email)
    {
        return await _context.User
            .Include(x => x.Roles)
            .SingleOrDefaultAsync(x => x.Email == email);
    }

    /// <summary>
    /// Läser upp användare via id
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    public async Task<User> GetById(Guid id)
    {
        return await _context.User
            .Include(x => x.Roles)
            .SingleAsync(x => x.Id == id);
    }
}