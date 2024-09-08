using Kkmk.Api.Domain.Calendar;
using Kmk.Api.Domain.Calendar;
using System;

namespace Kmk.Api.Application.Calendar;

public class EventDetails
{
    public Guid Id { get; set; }
    public DateTime Date { get; set; }
    public EventStatus Status { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public List<Invite> Invites { get; set; }
    public int NoOfAnswers => Invites.Where(invite => invite.Status is not null).Count();
    public int Day => Date.Day;

    public string DateText
    {
        get
        {
            bool today = Date.Date == DateTime.Now.Date;

            if (today)
                return "Idag";

            bool thisWeek = Date - DateTime.Now < TimeSpan.FromDays(7)
                            && Date.DayOfWeek < DateTime.Now.DayOfWeek;

            if (thisWeek)
                return CalendarUtils.DayOfWeekToString(Date.DayOfWeek);

            string text = CalendarUtils.DayOfWeekToString(Date.DayOfWeek) + " " + Date.Day + " " + CalendarUtils.MonthToString((Month)Date.Month) + " " + Date.Year;

            return text;
        }
    }

    public EventDetails(Event @event)
    {
        Id = @event.Id;
        Date = @event.Date;
        Status = @event.Status;
        Title = @event.Title;
        Description = @event.Description;
        Location = @event.Location;
        Invites = @event.Invites;
    }
}
