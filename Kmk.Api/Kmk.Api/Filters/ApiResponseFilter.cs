using Kmk.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Kmk.Api.Filters;

public class ApiResponseFilter : IAsyncResultFilter
{
    public async Task OnResultExecutionAsync(ResultExecutingContext context, ResultExecutionDelegate next)
    {
        if (context.Result is ObjectResult objectResult)
        {
            var wrapped = Activator.CreateInstance(
                typeof(ApiResponse<>).MakeGenericType(objectResult.Value?.GetType() ?? typeof(object))
            );

            wrapped!.GetType().GetProperty("IsSuccess")?.SetValue(wrapped, true);
            wrapped!.GetType().GetProperty("Payload")?.SetValue(wrapped, objectResult.Value);

            context.Result = new ObjectResult(wrapped)
            {
                StatusCode = objectResult.StatusCode
            };
        }
        else if (context.Result is EmptyResult)
        {
            context.Result = new ObjectResult(new ApiResponse<object>
            {
                IsSuccess = true,
                Payload = null
            });
        }

        await next();
    }
}