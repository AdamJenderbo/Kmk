using Kmk.Api.Domain.Arrangements;
using Kmk.Persistence;

namespace Kmk.Api.Application.Arrangements.Commands;

public class CreateArrangementCommand
{
    public int SerialNumber { get; set; }
    public string Title { get; set; } = string.Empty;
    public string CreatedBy { get; set; } = string.Empty;
    public string Composer { get; set; } = string.Empty;
    public string Arranger { get; set; } = string.Empty;
}

public class CreateArrangementResponse
{
    public bool IsSuccess { get; private set; }
    public string? Message { get; private set; }
    public Arrangement? Arrangement { get; private set; }

    public static CreateArrangementResponse Success(Arrangement arrangement)
    {
        return new CreateArrangementResponse
        {
            IsSuccess = true,
            Arrangement = arrangement
        };
    }

    public static CreateArrangementResponse Error(string message)
    {
        return new CreateArrangementResponse
        {
            IsSuccess = false,
            Message = message
        };

    }
}

public class CreateArrangementCommandHandler
{
    KmkContext _context;

    public CreateArrangementCommandHandler(KmkContext context)
    {
        _context = context;
    }

    public CreateArrangementResponse Handle(CreateArrangementCommand request)
    {
        string? validationError = Validate(request);

        if(validationError is not null)
            return CreateArrangementResponse.Error(validationError);

        Arrangement arrangement = new Arrangement(
            request.SerialNumber, 
            request.Title,
            request.Composer,
            request.Arranger);

        _context.Arrangement.Add(arrangement);

        _context.SaveChanges();

        return CreateArrangementResponse.Success(arrangement);
    }

    private string? Validate(CreateArrangementCommand request)
    {
        if (_context.Arrangement.Any(x => x.SerialNumber == request.SerialNumber))
            return "Löpnummer finns redan!";

        if (request.SerialNumber == 0)
            return "Löpnummer får inte vara 0!";

        if (request.Title is null || request.Title.Length == 0)
            return "Titel saknas!";

        return null;
    }
}
