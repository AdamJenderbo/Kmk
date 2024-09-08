using Kmk.Api.Domain.Calendar;

namespace Kmk.Api.Application.Calendar;

public class CreateEventResponse
{
    public bool IsSuccess { get; set; }
    public Event? Event { get; set; }
    public string Message { get; set; } = string.Empty;

    public static CreateEventResponse Success(Event @event)
    {
        return new CreateEventResponse 
        { 
            IsSuccess = true,
            Event = @event
        };
    }

    public static CreateEventResponse Failure(string message) 
    {
        return new CreateEventResponse
        {
            IsSuccess = false,
            Message = message
        };
    }
}