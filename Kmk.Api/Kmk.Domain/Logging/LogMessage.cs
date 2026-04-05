namespace Kmk.Domain.Logging;

public class LogMessage
{
    public Guid Id {  get; private set; }
    public DateTime Timestamp { get; private set; }
    public LogMessageType Type { get; private set; }
    public string Message { get; private set; } = string.Empty;
    public string? Callstack { get; private set; }

    public LogMessage(LogMessageType type, string message)
        : this(type, message, null)
    {
    }

    public LogMessage(LogMessageType type, string message, string? callstack)
    {
        Id = Guid.NewGuid();
        Timestamp = DateTime.Now;
        Type = type;
        Message = message;
        Callstack = callstack;
    }
}