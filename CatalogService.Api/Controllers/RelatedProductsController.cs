using CatalogService.Api.DTOs.RelatedProducts;
using CatalogService.Api.Services;
using CatalogService.Api.Services.RelatedProducts;
using GlobalResponse.Shared.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace CatalogService.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class RelatedProductsController(IRelatedProdService relatedProdService, LocalizedMessageService messageService) : ControllerBase
    {
        private readonly IRelatedProdService _relatedProdService = relatedProdService;
        private readonly LocalizedMessageService _messageService = messageService;

        [HttpGet]
        public async Task<IActionResult> GetListAsync(string languageCode = "en", string? search = null, bool? isActive = null)
        {
            try
            {
                var categories = await _relatedProdService.GetListAsync(languageCode, search, isActive);

                if (categories == null || !categories.Any())
                    return this.NotFoundResponse<object>(await _messageService.GetMessageAsync("RELATED_PRODUCT_NOT_FOUND", languageCode));

                return this.OkResponse(categories, await _messageService.GetMessageAsync("CATEGORIES_FETCH_SUCCESS", languageCode));
            }
            catch (Exception ex)
            {
                return this.BadRequestResponse<object>($"{await _messageService.GetMessageAsync("SERVER_ERROR", languageCode)}: {ex.Message}");
            }
        }

        [HttpPost("Create")]
        public async Task<IActionResult> CreateAsync([FromHeader] string userID, [FromBody] RelatedCreateDto dto, string languageCode = "en")
        {
            try
            {
                if (string.IsNullOrWhiteSpace(userID))
                    userID = HttpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown_ip";

                var result = await _relatedProdService.CreateAsync(userID, dto, languageCode);

                if (result <= 0)
                    return this.BadRequestResponse<object>(await _messageService.GetMessageAsync("OPERATION_FAILED", languageCode));

                return this.OkResponse(result, await _messageService.GetMessageAsync("RELATED_PRODUCT_CREATED", languageCode));
            }
            catch (Exception ex)
            {
                return this.BadRequestResponse<object>($"{await _messageService.GetMessageAsync("SERVER_ERROR", languageCode)}: {ex.Message}");
            }
        }

        [HttpPut("Update")]
        public async Task<IActionResult> UpdateAsync([FromHeader] string userID, [FromBody] RelatedUpdateDto dto, string languageCode = "en")
        {
            try
            {
                if (string.IsNullOrWhiteSpace(userID))
                    userID = HttpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown_ip";

                var result = await _relatedProdService.UpdateAsync(userID, dto);

                if (result <= 0)
                    return this.BadRequestResponse<object>(await _messageService.GetMessageAsync("OPERATION_FAILED", languageCode));

                return this.OkResponse(result, await _messageService.GetMessageAsync("RELATED_PRODUCT_UPDATED", languageCode));
            }
            catch (Exception ex)
            {
                return this.BadRequestResponse<object>($"{await _messageService.GetMessageAsync("SERVER_ERROR", languageCode)}: {ex.Message}");
            }
        }

        [HttpPatch("Delete/{relatedProdID:long}")]
        public async Task<IActionResult> SetActiveAsync([FromHeader] string userID, long relatedProdID, bool isActive, string languageCode = "en")
        {
            try
            {
                if (string.IsNullOrWhiteSpace(userID))
                    userID = HttpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown_ip";

                await _relatedProdService.SetActiveAsync(userID, relatedProdID, isActive);

                return this.OkResponse<object>(null!, await _messageService.GetMessageAsync("RELATED_PRODUCT_DELETED", languageCode));
            }
            catch (Exception ex)
            {
                return this.BadRequestResponse<object>($"{await _messageService.GetMessageAsync("SERVER_ERROR", languageCode)}: {ex.Message}");
            }
        }
    }
}
