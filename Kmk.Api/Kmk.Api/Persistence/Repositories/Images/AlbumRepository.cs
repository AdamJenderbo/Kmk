using Kmk.Api.Domain.Images;
using Kmk.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Kmk.Api.Persistence.Repositories.Images;

public class AlbumRepository
{
    KmkContext _context;

    public AlbumRepository(KmkContext context)
    {
        _context = context;
    }

    public List<Album> GetAlbums()
    {
        return _context.Album
            .Include(x => x.Images)
            .OrderByDescending(x => x.Date)
            .ToList();
    }

    public Album GetAlbum(Guid id)
    {
        return _context.Album.Include(x => x.Images).Single(a => a.Id == id);
    }

    public void AddAlbum(Album album)
    {
        _context.Album.Add(album);
    }
}