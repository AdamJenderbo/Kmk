using Kmk.Application.Logging.Services;
using Kmk.Domain.Arrangements;
using MediatR;

namespace Kmk.Application.Arrangements.Commands;

/// <summary>
/// Sparar arrangemang
/// </summary>
public record SaveArrangement(
    int SerialNumber,
    string Title,
    string Composer,
    string Arranger) : IRequest;

public record SaveArrangementHandler(
    IArrangementRepository _repository, 
    IUnitOfWork _unitOfWork, 
    ILogger _logger) : IRequestHandler<SaveArrangement>
{
    public async Task Handle(SaveArrangement request, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(request.Title))
            throw new Exception("Kan inte spara arrangemang. Titel saknas!");

        var arrangement = await _repository.GetBySerialNumber(request.SerialNumber);

        if (arrangement is null)
            throw new Exception("Kan inte spara arrangemang. Arrangmang finns inte!");

        arrangement.Title = request.Title;
        arrangement.Composer = request.Composer;
        arrangement.Arranger = request.Arranger;

        _logger.Log($"Sparade arrangemang {arrangement.SerialNumber}");

        await _unitOfWork.Save();
    }
}