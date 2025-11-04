using GlobalResponse.Shared.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GlobalResponse.Shared.Extensions;

public static class ResponseExtensions
{
    public static IActionResult ToActionResult<T>(this ApiResponse<T> response)
    {
        return new ObjectResult(response)
        {
            StatusCode = response.StatusCode
        };
    }

    public static ApiResponse<T> WithTraceId<T>(this ApiResponse<T> response, HttpContext httpContext)
    {
        response.TraceId = httpContext.TraceIdentifier;
        return response;
    }

    public static IActionResult Ok<T>(T data, string message = "Success")
    {
        return ApiResponse<T>.SuccessResponse(data, message).ToActionResult();
    }

    public static IActionResult BadRequest<T>(string message, List<string>? errors = null)
    {
        return ApiResponse<T>.ErrorResponse(message, errors, 400).ToActionResult();
    }

    public static IActionResult NotFound<T>(string message = "Resource not found")
    {
        return ApiResponse<T>.NotFoundResponse(message).ToActionResult();
    }

    public static IActionResult Unauthorized<T>(string message = "Unauthorized")
    {
        return ApiResponse<T>.UnauthorizedResponse(message).ToActionResult();
    }
}
