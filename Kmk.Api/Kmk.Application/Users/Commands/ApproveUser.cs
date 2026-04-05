using Kmk.Domain.Users;
using MediatR;

namespace Kmk.Application.Users.Commands;

/// <summary>
/// Godkänner användare
/// </summary>
public record ApproveUser(Guid Id) : IRequest;

public class ApproveUserHandler(
    IUserRepository _userRepository, 
    IUnitOfWork _unitOfWork) : IRequestHandler<ApproveUser>
{
    public async Task Handle(ApproveUser request, CancellationToken cancellationToken)
    {
        var user = await _userRepository.GetById(request.Id);

        if (user is null)
            throw new Exception("Kan inte godkänna användare. Användare finns inte.");

        user.Approve();

        await _unitOfWork.Save();
    }
}