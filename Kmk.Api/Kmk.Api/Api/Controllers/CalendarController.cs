using Kmk.Api.Api.Requests;
using Kmk.Api.Application.Calendar;
using Kmk.Api.Domain.Calendar;
using Kmk.Api.Persistence;
using Microsoft.AspNetCore.Mvc;

namespace Kmk.Api.Api.Controllers;


[ApiController]
[Route("api/calendar")]
public class CalendarController : ControllerBase
{
    CalendarService _calendarService;

    UnitOfWork _unitOfWork;

    public CalendarController(CalendarService calendarService, UnitOfWork unitOfWork) 
    { 
        _calendarService = calendarService;
        _unitOfWork = unitOfWork;
    }

    [HttpGet]
    public List<Event> GetEvents()
    {
        return _calendarService.GetUpcommingEvents();
    }


    [HttpGet]
    [Route("event/{id}")]
    public EventDetails GetEvent(Guid id) 
    {
        return _calendarService.GetEvent(id);
    }

    [HttpPost]
    [Route("event")]
    public CreateEventResponse CreateEvent(CreateEventRequest request)
    {
        Token? token = Request.GetToken();

        if (token is null)
            throw new UnauthorizedAccessException();

        var response = _calendarService.CreateEvent(
            request.Date,
            request.Title,
            request.Description,
            request.Location,
            token.UserId);

        _unitOfWork.Save();

        return response;
    }

    [HttpPost]
    [Route("event/invite/accept")]
    public bool AcceptInvite(AcceptInviteRequest request)
    {
        _calendarService.AcceptInvite(request.EventId, request.UserId);
        _unitOfWork.Save();
        return true;
    }

    [HttpPost]
    [Route("event/invite/decline")]
    public bool DeclineInvite(DeclineInviteRequest request)
    {
        _calendarService.DeclineInvite(request.EventId, request.UserId);
        _unitOfWork.Save();
        return true;
    }
}