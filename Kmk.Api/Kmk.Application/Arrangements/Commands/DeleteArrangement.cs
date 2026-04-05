using Kmk.Application.Logging.Services;
using Kmk.Domain.Arrangements;
using MediatR;

namespace Kmk.Application.Arrangements.Commands;

/// <summary>
/// Raderar ett arrangemang
/// </summary>
public record DeleteArrangement(int SerialNumber) : IRequest;

public class DeleteArrangementHandler(
    IArrangementRepository _repository, 
    IUnitOfWork _unitOfWork, 
    ILogger _logger) : IRequestHandler<DeleteArrangement>
{
    public async Task Handle(DeleteArrangement request, CancellationToken cancellationToken)
    {
        var arrangement = await _repository.GetBySerialNumber(request.SerialNumber);

        if (arrangement is null)
            throw new Exception("Kan inte radera arrangemang. Arrangemang finns inte!");

        _repository.Remove(arrangement);

        _logger.Log($"Raderade arrangemang {arrangement.SerialNumber}");

        await _unitOfWork.Save();
    }
}