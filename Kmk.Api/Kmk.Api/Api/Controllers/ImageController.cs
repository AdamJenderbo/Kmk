using Kmk.Api.Application.Images;
using Kmk.Api.Domain.Images;
using Kmk.Api.Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Kmk.Api.Api.Controllers;

[ApiController]
[Route("api/image")]
public class ImageController : ControllerBase
{
    ImageService _imageService;
    UnitOfWork _unitOfWork;

    public ImageController(ImageService imageService, UnitOfWork unitOfWork)
    {
        _imageService = imageService;
        _unitOfWork = unitOfWork;
    }

    [HttpPost]
    [Route("upload")]
    public async Task<IActionResult> UploadImage(IFormFile file, [FromForm] Guid albumId)
    {
        if (file == null || file.Length == 0)
            return BadRequest("No file uploaded.");

        if (!file.ContentType.StartsWith("image/"))
            return BadRequest("File is not an image.");

        await _imageService.UploadImage(albumId, file);

        _unitOfWork.Save();

        return Ok();
    }

    [HttpGet]
    [Route("{id}")]
    public IActionResult GetImage(Guid id)
    {
        Image image = _imageService.GetImage(id);
        ImageData imageData = _imageService.GetImageData(id);

        if (image == null || imageData.Data == null)
        {
            return NotFound();
        }

        return File(imageData.Data, image.Mime);
    }
}