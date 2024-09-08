namespace Kmk.Api.Application;

public class PayloadResponse<T> : Response
{
    public T? Payload { get; set; }

    public static PayloadResponse<T> Success(T payload)
    {
        return new PayloadResponse<T>
        {
            IsSuccess = true,
            Payload = payload
        };
    }

    public static PayloadResponse<T> Error(string message)
    {
        return new PayloadResponse<T>
        {
            IsSuccess = false,
            Message = message
        };
    }
}
