using Kmk.Domain.Arrangements;
using MediatR;

namespace Kmk.Application.Arrangements.Queries;

public enum ArrangementSorting
{
    SerialNumber = 0,
    Title = 1,
    Composer = 2,
    Arranger = 3
}

public record ListArrangements(
    ArrangementSorting Sorting,
    string Filter) : IRequest<List<Arrangement>>;

public class ListArrangementQueryHandler(IArrangementRepository _arrangementRepository) : IRequestHandler<ListArrangements, List<Arrangement>>
{
    public async Task<List<Arrangement>> Handle(ListArrangements request, CancellationToken cancellationToken)
    {
        var arrangements = await _arrangementRepository.List();

        var query = arrangements.Where(x =>
                        x.SerialNumber.ToString().Contains(request.Filter.ToLower()) ||
                        x.Title.ToLower().Contains(request.Filter.ToLower()) ||
                        x.Composer.ToLower().Contains(request.Filter.ToLower()) ||
                        x.Arranger.ToLower().Contains(request.Filter.ToLower()));

        switch (request.Sorting)
        {
            case ArrangementSorting.Title:
                query = query.OrderBy(x => x.Title);
                break;
            case ArrangementSorting.Composer:
                query = query.OrderBy(x => x.Composer);
                break;
            case ArrangementSorting.Arranger:
                query = query.OrderBy(x => x.Arranger);
                break;
            default:
                query = query.OrderBy(x => x.SerialNumber);
                break;
        }

        return query.ToList();
    }
}