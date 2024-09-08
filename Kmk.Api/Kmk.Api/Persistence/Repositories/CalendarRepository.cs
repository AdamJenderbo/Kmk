using Kmk.Api.Domain.Calendar;
using Kmk.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Kmk.Api.Persistence.Repositories;

public class CalendarRepository
{
    KmkContext _context;

    public CalendarRepository(KmkContext context)
    {
        _context = context;
    }

    public List<Event> GetUpcommingEvents()
    {
        return _context.Event.Where(x => x.Date > DateTime.Now).ToList();
    }

    public Event GetEvent(Guid id)
    {
        return _context.Event
            .Include(x => x.Invites)
            .Single(x => x.Id == id);
    }

    public void AddEvent(Event @event)
    {
        _context.Event.Add(@event);
    }
}