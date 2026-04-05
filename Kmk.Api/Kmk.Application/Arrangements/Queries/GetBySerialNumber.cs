using Kmk.Domain.Arrangements;
using MediatR;

namespace Kmk.Application.Arrangements.Queries;

public record GetBySerialNumber(int SerialNumber) : IRequest<Arrangement>;

public class GetBySerialNumberHanlder(IArrangementRepository _arrangementRepository) : IRequestHandler<GetBySerialNumber, Arrangement>
{
    public async Task<Arrangement> Handle(GetBySerialNumber request, CancellationToken cancellationToken)
    {
        var arrangement = await _arrangementRepository.GetBySerialNumber(request.SerialNumber);

        if (arrangement is null)
            throw new Exception($"Kunde ej hitta arrangemang med löpnummer {request.SerialNumber}");

        return arrangement;
    }
}