using Kmk.Api.Models;
using Kmk.Application;
using Kmk.Application.Logging.Services;

namespace Kmk.Api.Middlewares;

public class ApiExceptionMiddleware
{
    private readonly RequestDelegate _next;

    public ApiExceptionMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context, Application.Logging.Services.ILogger logger, IUnitOfWork unitOfWork)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            logger.LogError(ex);
            await unitOfWork.Save();

            context.Response.StatusCode = StatusCodes.Status500InternalServerError;
            context.Response.ContentType = "application/json";

            var response = new ApiResponse 
            { 
                IsSuccess = false, 
                Message = ex.Message 
            };

            await context.Response.WriteAsJsonAsync(response);
        }
    }
}
