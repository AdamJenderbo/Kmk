namespace Kmk.Api.Domain.Images;

public class Image
{
    public Guid Id { get; set; }
    public string FileName { get; set; } = string.Empty;
    public string Mime { get; set; } = string.Empty;
    public string? Credit { get; set; } = string.Empty;

    public Image(string fileName, string mime, string? credit)
    {
        Id = Guid.NewGuid();
        FileName = fileName;
        Mime = mime;
        Credit = credit;
    }
}