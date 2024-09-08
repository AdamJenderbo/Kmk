using Kmk.Api.Domain.Images;
using Kmk.Api.Persistence.Repositories.Images;

namespace Kmk.Api.Application.Images;

public class AlbumService
{
    AlbumRepository _albumRepository;

    public AlbumService(AlbumRepository albumRepository)
    {
        _albumRepository = albumRepository;
    }

    public List<Album> GetAlbums()
    {
        return _albumRepository.GetAlbums();
    }

    public Album GetAlbum(Guid id)
    {
        return _albumRepository.GetAlbum(id);
    }

    public Album CreateAlbum(string title, DateTime date)
    {
        Album album = new Album(title, date);

        _albumRepository.AddAlbum(album);

        return album;
    }
}