using Kmk.Domain.Logging;

namespace Kmk.Application.Logging.Services.Implementations;

public class Logger(ILogRepository _logRepository) : ILogger
{
    /// <summary>
    /// Hämtar hela loggen
    /// </summary>
    /// <returns></returns>
    public async Task<List<LogMessage>> Get()
    {
        return await _logRepository.Get();
    }

    /// <summary>
    /// Loggar
    /// </summary>
    /// <param name="message"></param>
    public void Log(string message)
    {
        _logRepository.Add(new LogMessage(LogMessageType.Info, message));
    }

    /// <summary>
    /// Loggar succé
    /// </summary>
    /// <param name="message"></param>
    public void LogSuccess(string message)
    {
        _logRepository.Add(new LogMessage(LogMessageType.Success, message));
    }

    /// <summary>
    /// Loggar varning
    /// </summary>
    /// <param name="message"></param>
    public void LogWarning(string message)
    {
        _logRepository.Add(new LogMessage(LogMessageType.Warning, message));
    }

    /// <summary>
    /// Loggar ett exception
    /// </summary>
    /// <param name="ex"></param>
    public void LogError(Exception ex)
    {
        _logRepository.Add(new LogMessage(LogMessageType.Error, ex.Message, ex.StackTrace));
    }
}
