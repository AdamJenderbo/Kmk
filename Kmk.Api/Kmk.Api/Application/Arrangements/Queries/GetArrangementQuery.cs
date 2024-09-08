using Kmk.Api.Domain.Arrangements;
using Kmk.Persistence;

namespace Kmk.Api.Application.Arrangements.Queries;

public class GetArrangementQuery
{
    public int SerialNumber { get; set; }
}

public class GetArrangementQueryHandler
{
    KmkContext _context;

    public GetArrangementQueryHandler(KmkContext context)
    { 
        _context = context; 
    }

    public Arrangement Handle(GetArrangementQuery request)
    {
        return _context.Arrangement.Single(x => x.SerialNumber == request.SerialNumber);
    }
}