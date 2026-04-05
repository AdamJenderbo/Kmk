using Kmk.Domain.Emails;

namespace Kmk.Application.Notifications.Services;

public interface IEmailService
{
    void Send(Email email);
}