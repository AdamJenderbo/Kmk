using Kmk.Domain;
using Kmk.Domain.Arrangements;
using MediatR;

namespace Kmk.Application.Arrangements.Commands;

/// <summary>
/// Laddar upp stämma
/// </summary>
public record UploadArrangementPart(
    int SerialNumber, 
    Instrument Instrument, 
    Stream File, 
    string ContentType) : IRequest;

public class UploadArrangementPartHandler(
    IArrangementRepository _arrangementRepository,
    IFileStorageService _fileStorageService,
    IUnitOfWork _unitOfWork) : IRequestHandler<UploadArrangementPart>
{
    public async Task Handle(UploadArrangementPart request, CancellationToken cancellationToken)
    {
        var arrangement = await _arrangementRepository.GetBySerialNumber(request.SerialNumber);

        if (arrangement is null)
            throw new Exception("Kan inte ladda upp stämma. Arrangemang fins inte!");

        string folder = $"{arrangement.SerialNumber}. {arrangement.Title}";
        string fileName = $"{request.Instrument.ToString()}.pdf";

        string fileId = await _fileStorageService.UploadAsync(
            request.File,
            fileName,
            request.ContentType,
            folder);

        arrangement[request.Instrument].FileId = fileId;

        await _unitOfWork.Save();
    }
}