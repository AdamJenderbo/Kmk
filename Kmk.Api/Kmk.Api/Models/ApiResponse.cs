namespace Kmk.Api.Models;

public class ApiResponse
{
    public bool IsSuccess { get; set; }
    public string Message { get; set; } = string.Empty;
}

public class ApiResponse<T>
{
    public bool IsSuccess { get; set; }
    public T? Payload { get; set; }
    public string Message { get; protected set; } = string.Empty;
}