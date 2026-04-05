using Kmk.Application.Notifications.Commands;
using Kmk.Application.Notifications.ViewModels;
using Kmk.Domain.Users;

namespace Kmk.Application.Notifications.Services;

public interface INotificationService
{
    void Delete(Guid notificationId, Guid userId);
    List<NotificationViewModel> GetByUserId(Guid userId);
    void Read(Guid notificationId, Guid userId);
    void Read(List<Guid> notificationIds, Guid userId);
    void Send(string title, string message, User user);
    void Send(string title, string message, List<User> users);
}