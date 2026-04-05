using MediatR;

namespace Kmk.Domain.Users.Events;

public record UserApprovedEvent(User User) : INotification;