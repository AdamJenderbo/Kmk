namespace Kmk.Api.Domain.Images;

public class ImageData
{
    public Guid Id { get; set; }
    public Guid ImageId { get; set; }
    public byte[] Data { get; set; }

    public ImageData(Guid imageId, byte[] data)
    {
        Id = Guid.NewGuid();
        ImageId = imageId;
        Data = data;
    }
}