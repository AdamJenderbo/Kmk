using Kmk.Application.Logging.Services;
using Kmk.Domain.Arrangements;
using MediatR;

namespace Kmk.Application.Arrangements.Commands;

/// <summary>
/// Skapar ett nytt arrangemang
/// </summary>
public record CreateArrangement(
    int SerialNumber,
    string Title,
    string Composer,
    string Arranger,
    string CreatedBy) : IRequest<Arrangement>;

public class CreateArrangementHandler(
    IArrangementRepository _arrangementRepository, 
    IUnitOfWork _unitOfWork,
    IMediator _mediator,
    ILogger _logger) : IRequestHandler<CreateArrangement, Arrangement>
{
    public async Task<Arrangement> Handle(CreateArrangement request, CancellationToken cancellationToken)
    {
        if (request.SerialNumber == 0)
            throw new Exception("Löpnummer får inte vara 0!");

        if (string.IsNullOrWhiteSpace(request.Title))
            throw new Exception("Titel saknas!");

        if (await _arrangementRepository.Any(x => x.SerialNumber == request.SerialNumber))
            throw new Exception("Löpnummer finns redan!");

        var arrangement = new Arrangement(
            request.SerialNumber,
            request.Title,
            request.Composer,
            request.Arranger);

        _arrangementRepository.Add(arrangement);

        _logger.Log("Skapade arrangemang");

        await _unitOfWork.Save();

        await _mediator.Publish(new ArrangementCreatedEvent(arrangement));

        return arrangement;
    }
}