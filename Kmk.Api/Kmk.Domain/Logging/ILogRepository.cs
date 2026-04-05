namespace Kmk.Domain.Logging;

public interface ILogRepository
{
    void Add(LogMessage message);
    Task<List<LogMessage>> Get();
}
