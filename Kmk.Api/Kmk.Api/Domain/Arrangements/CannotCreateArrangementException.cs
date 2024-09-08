namespace Kmk.Api.Domain.Arrangements;

public class CannotCreateArrangementException : Exception
{
    public CannotCreateArrangementException(string reason) 
        : base("Kan inte skapa arrangemang. " + reason) 
    {
        
    }
}
