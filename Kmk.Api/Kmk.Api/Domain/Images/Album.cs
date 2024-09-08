namespace Kmk.Api.Domain.Images;

public class Album
{
    public Guid Id { get; set; }
    public DateTime Created { get; set; }
    public string Title { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    public List<Image> Images { get; set; }

    public Album(string title, DateTime date)
    {
        Id = Guid.NewGuid();
        Created = DateTime.Now;
        Title = title;
        Images = new List<Image>();
        Date = date;
    }

    public void AddImage(Image image)
    {
        Images.Add(image);
    }
}