using Kmk.Application.Notifications.Services;
using Kmk.Domain.Users;
using Kmk.Domain.Users.Events;
using MediatR;

namespace Kmk.Application.Users.Events;

/// <summary>
/// Skickar notifikation till styrelsen om en ny medlemmsansökan lämnats in
/// </summary>
public class UserRegistered_NotifyBoard(
    INotificationService _notificationService,
    IUserRepository _userRepository,
    IUnitOfWork _unitOfWork) : INotificationHandler<UserRegisteredEvent>
{
    public async Task Handle(UserRegisteredEvent e, CancellationToken cancellationToken)
    {
        var boardMembers = await _userRepository.GetBoardMembers();

        _notificationService.Send(
            "En ny medlamsansökan har kommit",
            $"{e.User.FirstName} {e.User.LastName} har ansökt om att gå med i Kungälvs musikkår",
            boardMembers);

        await _unitOfWork.Save();
    }
}