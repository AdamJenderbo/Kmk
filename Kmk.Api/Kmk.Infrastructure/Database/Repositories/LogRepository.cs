using Kmk.Domain.Logging;
using Microsoft.EntityFrameworkCore;

namespace Kmk.Infrastructure.Database.Repositories;

public class LogRepository(KmkContext _db) : ILogRepository
{
    /// <summary>
    /// Lägger till logmeddelande
    /// </summary>
    /// <param name="message"></param>
    public void Add(LogMessage message)
    {
        _db.LogMessage.Add(message);
    }

    /// <summary>
    /// Listar alla logmeddelanden
    /// </summary>
    /// <returns></returns>
    public async Task<List<LogMessage>> Get()
    {
        return await _db.LogMessage.OrderByDescending(x => x.Timestamp).ToListAsync();
    }
}