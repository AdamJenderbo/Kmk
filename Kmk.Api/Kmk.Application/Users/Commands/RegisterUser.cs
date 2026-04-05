using Kmk.Application.Users.Services;
using Kmk.Domain;
using Kmk.Domain.Users;
using MediatR;

namespace Kmk.Application.Users.Commands;

public record RegisterUser(
    string Email,
    string Password,
    string FirstName,
    string LastName,
    string Address,
    string PhoneNumber,
    DateTime DateOfBirth,
    Instrument Instrument) : IRequest<User>;

public class RegisterUserHander(
    IUserRepository _userRepository, 
    ICryptographyService _cryptographyService, 
    IUnitOfWork _unitOfWork) : IRequestHandler<RegisterUser, User>
{
    public async Task<User> Handle(RegisterUser request, CancellationToken cancellationToken)
    {
        if (string.IsNullOrEmpty(request.Email)) throw new Exception("Email saknas");
        if (string.IsNullOrEmpty(request.Password)) throw new Exception("Lösenord saknas");
        if (string.IsNullOrEmpty(request.FirstName)) throw new Exception("Förnamn saknas");
        if (string.IsNullOrEmpty(request.LastName)) throw new Exception("Efternamn saknas");
        if (string.IsNullOrEmpty(request.Address)) throw new Exception("Address saknas");
        if (string.IsNullOrEmpty(request.PhoneNumber)) throw new Exception("Telefonnummer saknas");

        if (await _userRepository.Any(x => x.Email == request.Email))
            throw new Exception("Email används redan av en existerande medlem");

        string hashedPassword = _cryptographyService.Hash(request.Password);

        var user = new User(
            request.Email,
            hashedPassword,
            request.FirstName,
            request.LastName,
            request.DateOfBirth,
            request.Address,
            request.PhoneNumber,
            request.Instrument);

        _userRepository.Add(user);

        await _unitOfWork.Save();

        return user;
    }
}