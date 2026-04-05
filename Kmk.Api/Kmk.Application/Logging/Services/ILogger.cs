using Kmk.Domain.Logging;

namespace Kmk.Application.Logging.Services;

public interface ILogger
{
    Task<List<LogMessage>> Get();
    void Log(string message);
    void LogError(Exception exception);
}
