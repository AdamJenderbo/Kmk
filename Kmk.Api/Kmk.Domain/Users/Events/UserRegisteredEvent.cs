using MediatR;

namespace Kmk.Domain.Users.Events;

public record UserRegisteredEvent(User User) : INotification;