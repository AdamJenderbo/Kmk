using Kmk.Domain.Users;
using MediatR;

namespace Kmk.Domain.Notifications.Events;

public record UserNotified(Notification Notification, User User) : INotification;
