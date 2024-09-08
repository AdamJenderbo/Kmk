using Kmk.Api.Application.Notifications;
using Kmk.Api.Application.Users;
using Kmk.Api.Domain.Calendar;
using Kmk.Api.Domain.Users;
using Kmk.Api.Persistence.Repositories;

namespace Kmk.Api.Application.Calendar;

public class CalendarService
{
    UserService _userService;
    CalendarRepository _calendarRepository;
    NotificationService _notificationService;

    public CalendarService(
        UserService userService, 
        CalendarRepository calendarRepository, 
        NotificationService notificationService) 
    {
        _userService = userService;
        _calendarRepository = calendarRepository;
        _notificationService = notificationService;
    }

    /// <summary>
    /// Läs upp evenemang
    /// </summary>
    /// <returns></returns>
    public List<Event> GetUpcommingEvents()
    {
        return _calendarRepository.GetUpcommingEvents();
    }

    /// <summary>
    /// Läs upp evenemang
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    public EventDetails GetEvent(Guid id)
    {
        Event @event = _calendarRepository.GetEvent(id);

        return new EventDetails(@event);
    }

    /// <summary>
    /// Skapa evenemang
    /// </summary>
    /// <param name="date"></param>
    /// <param name="title"></param>
    /// <param name="description"></param>
    /// <param name="location"></param>
    /// <param name="createdBy"></param>
    /// <returns></returns>
    public CreateEventResponse CreateEvent(
        DateTime date,
        string title,
        string description, 
        string location,
        Guid createdBy)
    {
        if (date < DateTime.Now)
            return CreateEventResponse.Failure("Kan inte skapa evenemang. Evenemang har redan hänt.");

        User createdByUser = _userService.GetUser(createdBy);

        Event @event = new Event(date, title, description, location, createdByUser);

        _calendarRepository.AddEvent(@event);

        var users = _userService.GetUsers();

        foreach(User user in users)
        {
            @event.Invite(user);
            _notificationService.SendNotification(user.Id, "Nytt evenemang tillagt!", "Evenemanget " + @event.Title + " är tillagt.");
        }

        return CreateEventResponse.Success(@event);
    }

    /// <summary>
    /// Acceptera inbjudan
    /// </summary>
    /// <param name="eventId"></param>
    /// <param name="userId"></param>
    public void AcceptInvite(Guid eventId, Guid userId)
    {
        Event @event = _calendarRepository.GetEvent(eventId);

        User user = _userService.GetUser(userId);

        @event.AcceptInvite(user);
    }

    /// <summary>
    /// Avböj inbjudan
    /// </summary>
    /// <param name="eventId"></param>
    /// <param name="userId"></param>
    public void DeclineInvite(Guid eventId, Guid userId)
    {
        Event @event = _calendarRepository.GetEvent(eventId);

        User user = _userService.GetUser(userId);

        @event.DeclineInvite(user);
    }
}
