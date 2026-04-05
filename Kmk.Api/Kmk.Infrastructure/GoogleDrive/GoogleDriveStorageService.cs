using Google.Apis.Drive.v3;
using Kmk.Application;

namespace Kmk.Infrastructure.GoogleDrive;

public class GoogleDriveStorageService : IFileStorageService
{
    private readonly DriveService _driveService;

    public GoogleDriveStorageService()
    {
        _driveService = GoogleDriveServiceFactory.CreateService();
    }

    public async Task<(Stream Stream, string FileName, string ContentType)> DownloadAsync(string fileId)
    {
        var fileRequest = _driveService.Files.Get(fileId);
        fileRequest.Fields = "name, mimeType";

        var file = await fileRequest.ExecuteAsync();

        var stream = new MemoryStream();
        await _driveService.Files.Get(fileId).DownloadAsync(stream);
        stream.Position = 0;

        return (stream, file.Name, file.MimeType);
    }

    public async Task DeleteAsync(string fileId)
    {
        await _driveService.Files.Delete(fileId).ExecuteAsync();
    }

    public async Task<string> UploadAsync(Stream fileStream, string fileName, string contentType, string folder)
    {
        var folderId = await GetOrCreateFolderAsync(folder);

        var fileMetadata = new Google.Apis.Drive.v3.Data.File
        {
            Name = fileName,
            Parents = new[] { folderId }
        };

        var request = _driveService.Files.Create(fileMetadata, fileStream, contentType);
        request.Fields = "id";

        var result = await request.UploadAsync();

        return request.ResponseBody.Id;
    }

    private async Task<string> CreateFolderAsync(string name)
    {
        var folderMetadata = new Google.Apis.Drive.v3.Data.File
        {
            Name = name,
            MimeType = "application/vnd.google-apps.folder",
            Parents = new[] { "1YibUjGjMRX_7zFA2wkPho_Q963N7dhVQ" } // Noter mappen
        };

        var request = _driveService.Files.Create(folderMetadata);
        request.Fields = "id";

        var result = await request.ExecuteAsync();
        return result.Id;
    }

    private async Task<string> GetOrCreateFolderAsync(string name)
    {
        var listRequest = _driveService.Files.List();
        listRequest.Q = $"mimeType = 'application/vnd.google-apps.folder' and name = '{name}' and trashed = false";
        listRequest.Fields = "files(id, name)";

        var result = await listRequest.ExecuteAsync();

        var folder = result.Files.FirstOrDefault();

        if (folder != null)
            return folder.Id;

        return await CreateFolderAsync(name);
    }
}
