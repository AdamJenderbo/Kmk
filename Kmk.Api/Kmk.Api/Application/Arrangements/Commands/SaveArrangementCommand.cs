using Kmk.Api.Domain.Arrangements;
using Kmk.Persistence;

namespace Kmk.Api.Application.Arrangements.Commands;

public class SaveArrangementCommand
{
    public int SerialNumber { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Composer { get; set; } = string.Empty;
    public string Arranger { get; set; } = string.Empty;

    public string? Validate()
    {
        if (Title is null || Title.Length == 0)
            return "Titel saknas!";

        return null;
    }
}

public class SaveArrangementResponse
{
    public bool IsSuccess { get; private set; }
    public string? Message { get; private set; }
    public Arrangement? Arrangement { get; private set; }

    public static SaveArrangementResponse Success(Arrangement arrangement)
    {
        return new SaveArrangementResponse
        {
            IsSuccess = true,
            Arrangement = arrangement
        };
    }

    public static SaveArrangementResponse Error(string message)
    {
        return new SaveArrangementResponse
        {
            IsSuccess = false,
            Message = message
        };
    }
}

public class SaveArrangementCommandHandler
{
    KmkContext _context;

    public SaveArrangementCommandHandler(KmkContext context)
    {
        _context = context;
    }

    public SaveArrangementResponse Handle(SaveArrangementCommand request)
    {
        string? validationError = request.Validate();

        if (validationError is not null)
            return SaveArrangementResponse.Error(validationError);

        Arrangement arrangement = _context.Arrangement.Single(x => x.SerialNumber == request.SerialNumber);

        arrangement.Title = request.Title;
        arrangement.Composer = request.Composer;
        arrangement.Arranger = request.Arranger;

        _context.SaveChanges();

        return SaveArrangementResponse.Success(arrangement);
    }
}
