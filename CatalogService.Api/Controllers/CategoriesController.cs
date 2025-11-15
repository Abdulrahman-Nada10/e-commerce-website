using CatalogService.Api.DTOs.Categories;
using CatalogService.Api.Services;
using CatalogService.Api.Services.Categories;
using GlobalResponse.Shared.Extensions;
using Microsoft.AspNetCore.Mvc;
namespace CatalogService.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class CategoriesController(ICategoryService categoryService, LocalizedMessageService messageService) : ControllerBase
{
    private readonly ICategoryService _categoryService = categoryService;
    private readonly LocalizedMessageService _messageService = messageService;

    [HttpGet]
    public async Task<IActionResult> GetListAsync(string languageCode = "en", string? search = null, bool? isActive = null)
    {
        try
        {
            var categories = await _categoryService.GetListAsync(languageCode, search, isActive);

            if (categories == null || !categories.Any())
                return this.NotFoundResponse<object>(await _messageService.GetMessageAsync("CATEGORY_NOT_FOUND", languageCode));

            return this.OkResponse(categories, await _messageService.GetMessageAsync("CATEGORIES_FETCH_SUCCESS", languageCode));
        }
        catch (Exception ex)
        {
            return this.BadRequestResponse<object>($"{await _messageService.GetMessageAsync("SERVER_ERROR", languageCode)}: {ex.Message}");
        }
    }

    //[HttpGet("{categoryID:int}")]
    //public async Task<IActionResult> GetByIdAsync(int categoryID, string languageCode = "en")
    //{
    //    try
    //    {
    //        var category = await _categoryService.GetByIdAsync(categoryID, languageCode);

    //        if (category == null)
    //            return this.NotFoundResponse<object>(await _messageService.GetMessageAsync("CATEGORY_NOT_FOUND", languageCode));

    //        return this.OkResponse(category, await _messageService.GetMessageAsync("CATEGORIES_FETCH_SUCCESS", languageCode));
    //    }
    //    catch (Exception ex)
    //    {
    //        return this.BadRequestResponse<object>($"{await _messageService.GetMessageAsync("SERVER_ERROR", languageCode)}: {ex.Message}");
    //    }
    //}

    [HttpPost("Create")]
    public async Task<IActionResult> CreateAsync([FromHeader] string userID, [FromBody] CategoryCreateDto dto, string languageCode = "en")
    {
        try
        {
            if (string.IsNullOrWhiteSpace(userID))
                userID = HttpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown_ip";

            var result = await _categoryService.CreateAsync(userID, dto, languageCode);

            if (result <= 0)
                return this.BadRequestResponse<object>(await _messageService.GetMessageAsync("OPERATION_FAILED", languageCode));

            return this.OkResponse(result, await _messageService.GetMessageAsync("CATEGORY_CREATED", languageCode));
        }
        catch (Exception ex)
        {
            return this.BadRequestResponse<object>($"{await _messageService.GetMessageAsync("SERVER_ERROR", languageCode)}: {ex.Message}");
        }
    }

    [HttpPut("Update")]
    public async Task<IActionResult> UpdateAsync([FromHeader] string userID, [FromBody] CategoryUpdateDto dto, string languageCode = "en")
    {
        try
        {
            if (string.IsNullOrWhiteSpace(userID))
                userID = HttpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown_ip";

            var result = await _categoryService.UpdateAsync(userID, dto, languageCode);

            if (result <= 0)
                return this.BadRequestResponse<object>(await _messageService.GetMessageAsync("OPERATION_FAILED", languageCode));

            return this.OkResponse(result, await _messageService.GetMessageAsync("CATEGORY_UPDATED", languageCode));
        }
        catch (Exception ex)
        {
            return this.BadRequestResponse<object>($"{await _messageService.GetMessageAsync("SERVER_ERROR", languageCode)}: {ex.Message}");
        }
    }

    [HttpPatch("Delete/{categoryID:int}")]
    public async Task<IActionResult> SetActiveAsync([FromHeader] string userID, int categoryID, bool isActive, string languageCode = "en")
    {
        try
        {
            if (string.IsNullOrWhiteSpace(userID))
                userID = HttpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown_ip";

            await _categoryService.SetActiveAsync(userID, categoryID, isActive, languageCode);

            return this.OkResponse<object>(null!, await _messageService.GetMessageAsync("CATEGORY_DELETED", languageCode)
            );
        }
        catch (Exception ex)
        {
            return this.BadRequestResponse<object>($"{await _messageService.GetMessageAsync("SERVER_ERROR", languageCode)}: {ex.Message}");
        }
    }
}
