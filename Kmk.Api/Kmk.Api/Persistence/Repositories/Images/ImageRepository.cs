using Kmk.Api.Domain.Images;
using Kmk.Persistence;

namespace Kmk.Api.Persistence.Repositories.Images;

public class ImageRepository
{
    KmkContext _context;

    public ImageRepository(KmkContext context)
    {
        _context = context;
    }

    public Image GetImage(Guid id)
    {
        return _context.Image.Single(x => x.Id == id);
    }

    public ImageData GetImageData(Guid id)
    {
        return _context.ImageData.Single(x => x.ImageId == id);
    }

    public void AddImage(Image image)
    {
        _context.Image.Add(image);
    }

    public void AddImageData(ImageData imageData)
    {
        _context.ImageData.Add(imageData);
    }
}