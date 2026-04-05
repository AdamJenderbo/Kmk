using Kmk.Application.Logging.Services;
using Kmk.Domain.Logging;
using MediatR;

namespace Kmk.Application.Logging.Queries;

public record GetLogQuery() : IRequest<List<LogMessage>>;

public class GetLogQueryHandler(ILogger _logger) : IRequestHandler<GetLogQuery, List<LogMessage>>
{
    public async Task<List<LogMessage>> Handle(GetLogQuery request, CancellationToken cancellationToken)
    {
        return await _logger.Get();
    }
}