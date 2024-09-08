using Kmk.Api.Application.Authentication;
using Kmk.Api.Application.Authentication.Responses;
using Kmk.Api.Domain.Users;
using Kmk.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Kmk.Api.Application.Users;

public class UserService
{
    KmkContext _context;
    //ChannelService _channelService;

    public UserService(KmkContext context)
    {
        _context = context;
    }

    public List<User> GetUsers()
    {
        return GetUsers(new GetUsersRequest());
    }

    public List<User> GetUsers(GetUsersRequest request)
    {
        return _context.User
            .Include(x => x.Roles)
            .Where(x => x.Approved &&
                        (x.FirstName.Contains(request.Filter) ||
                         x.LastName.Contains(request.Filter)))
            .OrderBy(x => x.LastName)
            .ToList();
    }

    public User GetUser(Guid id)
    {
        return _context.User
            .Include(x => x.Roles)
            .Single(x => x.Id == id);
    }

    public User? GetUserByEmail(string email)
    {
        return _context.User.Include(x => x.Roles).SingleOrDefault(x => x.Email == email);
    }

    public RegisterUserResponse RegisterUser(RegisterUserRequest request)
    {
        string? validationError = request.Validate();

        if (validationError is not null)
            return RegisterUserResponse.Failure(validationError);

        if (_context.User.Any(x => x.Email == request.Email))
            return RegisterUserResponse.Failure("Kan inte skapa medlem. Email används redan av en existerande medlem");

        User user = new User(
            request.Email,
            AuthenticationService.HashPassword(request.Password),
            request.FirstName,
            request.LastName,
            request.DateOfBirth,
            request.Address,
            request.PhoneNumber,
            request.Instrument);

        _context.User.Add(user);

        // Lägg till användare i default kanalerna (gör detta senare genom event)
        //_channelService.AddUserToDefaultChannels(user);

        _context.SaveChanges();

        return RegisterUserResponse.Success(user);
    }

    public List<User> GetUnapprovedUsers()
    {
        return _context.User.Where(x => !x.Approved).ToList();
    }

    public void ApproveUser(Guid userId)
    {
        User user = GetUser(userId);
        
        user.Approve();

        _context.SaveChanges();

        SendWelcomeEmail(user);
    }

    private void SendWelcomeEmail(User user)
    {
    }
}
