namespace Kmk.Application;

public interface IFileStorageService
{
    Task<string> UploadAsync(Stream fileStream, string fileName, string contentType, string folder);
    Task<(Stream Stream, string FileName, string ContentType)> DownloadAsync(string fileId);
    Task DeleteAsync(string fileId);
}