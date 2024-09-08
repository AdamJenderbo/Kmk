using Kmk.Api.Domain.Images;
using Kmk.Api.Persistence.Repositories.Images;

namespace Kmk.Api.Application.Images;

public class ImageService
{
    ImageRepository _repository;
    AlbumService _albumService;

    public ImageService(ImageRepository repository, AlbumService albumService)
    {
        _repository = repository;
        _albumService = albumService;
    }

    public Image GetImage(Guid id)
    {
        return _repository.GetImage(id);
    }

    public ImageData GetImageData(Guid id)
    {
        return _repository.GetImageData(id);
    }

    public async Task UploadImage(Guid albumId, IFormFile file)
    {
        Album album = _albumService.GetAlbum(albumId);

        Image image = new Image(
            file.FileName, 
            file.ContentType,
            credit: null);

        _repository.AddImage(image);

        album.AddImage(image);

        byte[] bytes = await ReadBytes(file);

        ImageData imageData = new ImageData(image.Id, bytes);

        _repository.AddImageData(imageData);
    }

    private async Task<byte[]> ReadBytes(IFormFile file)
    {
        byte[] fileBytes;
        using (var memoryStream = new MemoryStream())
        {
            await file.CopyToAsync(memoryStream);
            fileBytes = memoryStream.ToArray();
        }

        return fileBytes;
    }
}