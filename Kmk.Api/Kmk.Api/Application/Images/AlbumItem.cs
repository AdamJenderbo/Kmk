namespace Kmk.Api.Application.Images;

public class AlbumItem
{
    public Guid Id { get; set; }
    public DateTime Created { get; set; }
    public string Title { get; set; } = string.Empty;
}