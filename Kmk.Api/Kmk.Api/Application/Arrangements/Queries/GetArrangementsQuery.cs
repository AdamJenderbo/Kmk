using Kmk.Api.Domain.Arrangements;
using Kmk.Persistence;

namespace Kmk.Api.Application.Arrangements.Queries;

public enum ArrangementSorting
{
    SerialNumber = 0,
    Title = 1,
    Composer = 2,
    Arranger = 3
}

public class GetArrangementsQuery
{
    public ArrangementSorting Sorting { get; set; }
    public string Filter { get; set; } = string.Empty;
}

public class GetArrangementsQueryHandler
{
    KmkContext _context;

    public GetArrangementsQueryHandler(KmkContext context)
    { 
        _context = context; 
    }

    public List<Arrangement> Handle(GetArrangementsQuery request)
    {
        IQueryable<Arrangement> query = _context.Arrangement
            .Where(x => x.SerialNumber.ToString().Contains(request.Filter) ||
                        x.Title.Contains(request.Filter) || 
                        x.Composer.Contains(request.Filter) ||
                        x.Arranger.Contains(request.Filter));

        switch(request.Sorting)
        {
            case ArrangementSorting.Title:
                query = query.OrderBy(x => x.Title);
                break;
            case ArrangementSorting.Composer:
                query = query.OrderBy(x => x.Title);
                break;
            case ArrangementSorting.Arranger:
                query = query.OrderBy(x => x.Title);
                break;
            default:
                query = query.OrderBy(x => x.SerialNumber);
                break;
        }

        return query.ToList();
    }
}