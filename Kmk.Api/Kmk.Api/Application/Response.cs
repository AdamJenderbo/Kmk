namespace Kmk.Api.Application;

public class Response
{
    public bool IsSuccess { get; set; }
    public string? Message { get; set; }

    public static Response Success()
    {
        return new Response
        {
            IsSuccess = true
        };
    }

    public static Response Error(string message)
    {
        return new Response
        {
            IsSuccess = false,
            Message = message
        };
    }
}
