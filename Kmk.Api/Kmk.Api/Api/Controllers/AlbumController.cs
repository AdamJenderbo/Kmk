using Kmk.Api.Api.Requests.Images;
using Kmk.Api.Application.Images;
using Kmk.Api.Domain.Images;
using Kmk.Api.Persistence;
using Microsoft.AspNetCore.Mvc;

namespace Kmk.Api.Api.Controllers;

[ApiController]
[Route("api/album")]
public class AlbumController : ControllerBase
{
    AlbumService _albumService;
    UnitOfWork _unitOfWork;

    public AlbumController(AlbumService albumService, UnitOfWork unitOfWork)
    {
        _albumService = albumService;
        _unitOfWork = unitOfWork;
    }

    [HttpGet]
    public List<Album> GetAlbums()
    {
        return _albumService.GetAlbums();
    }

    [HttpGet]
    [Route("{id}")]
    public Album GetAlbum(Guid id)
    {
        return _albumService.GetAlbum(id);
    }

    [HttpPost]
    public Album CreateAlbum(CreateAlbumRequest request)
    {
        Album album = _albumService.CreateAlbum(
            request.Title, 
            request.Date);

        _unitOfWork.Save();
        
        return album;
    }
}
