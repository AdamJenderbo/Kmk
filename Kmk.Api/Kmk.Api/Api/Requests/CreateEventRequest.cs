namespace Kmk.Api.Api.Requests;

public class CreateEventRequest
{
    public DateTime Date { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
}
