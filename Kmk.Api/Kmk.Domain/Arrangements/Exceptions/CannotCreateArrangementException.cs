namespace Kmk.Domain.Arrangements.Exceptions;

public class CannotCreateArrangementException : Exception
{
    public CannotCreateArrangementException(string reason)
        : base("Kan inte skapa arrangemang. " + reason)
    {

    }
}