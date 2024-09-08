using Kmk.Api.Domain.Arrangements;
using Kmk.Persistence;

namespace Kmk.Api.Application.Arrangements.Commands;

public class DeleteArrangementCommand
{
    public int SerialNumber { get; set; }
}

public class DeleteArrangementResponse
{
    public bool IsSuccess { get; private set; }
    public string? Message { get; private set; }

    public static DeleteArrangementResponse Success()
    {
        return new DeleteArrangementResponse
        {
            IsSuccess = true
        };
    }

    public static DeleteArrangementResponse Error(string message)
    {
        return new DeleteArrangementResponse
        {
            IsSuccess = false,
            Message = message
        };
    }
}

public class DeleteArrangementCommandHandler
{
    KmkContext _context;

    public DeleteArrangementCommandHandler(KmkContext context)
    {
        _context = context;
    }

    public DeleteArrangementResponse Handle(DeleteArrangementCommand request)
    {
        Arrangement? arrangement = _context.Arrangement.SingleOrDefault(x => x.SerialNumber == request.SerialNumber);

        if (arrangement is null)
            return DeleteArrangementResponse.Error("Kan inte radera arrangemang. Arrangemang finns inte!");

        _context.Arrangement.Remove(arrangement);

        _context.SaveChanges();

        return DeleteArrangementResponse.Success();
    }
}