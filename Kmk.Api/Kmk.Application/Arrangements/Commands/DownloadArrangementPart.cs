using MediatR;

namespace Kmk.Application.Arrangements.Commands;

/// <summary>
/// Laddar ner stämma
/// </summary>
public record DownloadArrangementPart(string FileId) : IRequest<(Stream Stream, string FileName, string ContentType)>;

public class DownloadArrangementPartHandler(IFileStorageService _fileStorageService) 
    : IRequestHandler<DownloadArrangementPart, (Stream Stream, string FileName, string ContentType)>
{
    public async Task<(Stream Stream, string FileName, string ContentType)> Handle(DownloadArrangementPart request, CancellationToken cancellationToken)
    {
        return await _fileStorageService.DownloadAsync(request.FileId);
    }
}