using Kkmk.Api.Domain.Calendar;

namespace Kmk.Api.Application.Calendar;

public class CalendarUtils
{
    public static string DayOfWeekToString(DayOfWeek dayOfWeek)
    {
        switch (dayOfWeek)
        {
            case DayOfWeek.Monday:
                return "Måndag";
            case DayOfWeek.Tuesday:
                return "Tisdag";
            case DayOfWeek.Wednesday:
                return "Onsdag";
            case DayOfWeek.Thursday:
                return "Torsdag";
            case DayOfWeek.Friday:
                return "Fredag";
            case DayOfWeek.Saturday:
                return "Lördag";
            case DayOfWeek.Sunday:
                return "Söndag";
        }
        return "";
    }

    public static string MonthToString(Month month)
    {
        switch (month)
        {
            case Month.JANUARY:
                return "Januari";
            case Month.FEBUARY:
                return "Februari";
            case Month.MARS:
                return "Mars";
            case Month.APRIL:
                return "April";
            case Month.MAY:
                return "Maj";
            case Month.JUNE:
                return "Juni";
            case Month.JULY:
                return "Juli";
            case Month.AUGUST:
                return "Augusti";
            case Month.SEPTEMBER:
                return "September";
            case Month.OCTOBER:
                return "Oktober";
            case Month.NOVEMBER:
                return "November";
            case Month.DECEMBER:
                return "December";
        }
        return "";
    }
}