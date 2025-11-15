using CatalogService.Api.DTOs.Brands;
using CatalogService.Api.Services;
using CatalogService.Api.Services.Brands;
using GlobalResponse.Shared.Extensions;
using Microsoft.AspNetCore.Mvc;
namespace CatalogService.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BrandsController(IBrandService brandService, LocalizedMessageService messageService) : ControllerBase
    {
        private readonly IBrandService _brandService = brandService;
        private readonly LocalizedMessageService _messageService = messageService;

        [HttpGet]
        public async Task<IActionResult> GetListAsync( string languageCode = "en", string? search = null, bool? isActive = null)
        {
            try
            {
                var brands = await _brandService.GetBrandsAsync(languageCode, search, isActive);

                if (brands == null || !brands.Any())
                    return this.NotFoundResponse<object>(await _messageService.GetMessageAsync("BRAND_NOT_FOUND", languageCode));

                return this.OkResponse(brands, await _messageService.GetMessageAsync("BRANDS_FETCH_SUCCESS", languageCode));
            }
            catch (Exception ex)
            {
                return this.BadRequestResponse<object>($"{await _messageService.GetMessageAsync("SERVER_ERROR", languageCode)}: {ex.Message}");
            }
        }

        //[HttpGet("{brandID:int}")]
        //public async Task<IActionResult> GetBrandByIdAsync(int brandID, string languageCode = "en")
        //{
        //    try
        //    {
        //        var brand = await _brandService.GetBrandByIdAsync(brandID, languageCode);

        //        if (brand == null)
        //        {
        //            var notFoundMsg = await _messageService.GetMessageAsync("BRAND_NOT_FOUND", languageCode);
        //            return this.NotFoundResponse<object>(notFoundMsg);
        //        }

        //        var successMsg = await _messageService.GetMessageAsync("BRAND_FETCH_SUCCESS", languageCode);
        //        return this.OkResponse(brand, successMsg);
        //    }
        //    catch (Exception ex)
        //    {
        //        return this.BadRequestResponse<object>($"{await _messageService.GetMessageAsync("SERVER_ERROR", languageCode)}: {ex.Message}");
        //    }
        //}

        [HttpPost("Create")]
        public async Task<IActionResult> CreateBrandAsync([FromQuery] string userID, [FromBody] BrandCreateDto dto, [FromQuery] string languageCode = "en")
        {
            try
            {
                if (string.IsNullOrWhiteSpace(userID))
                    userID = HttpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown_ip";

                var result = await _brandService.CreateBrandAsync(userID, dto, languageCode);

                if (result <= 0)
                    return this.BadRequestResponse<object>(await _messageService.GetMessageAsync("OPERATION_FAILED", languageCode));

                return this.OkResponse(result, await _messageService.GetMessageAsync("BRAND_CREATED", languageCode));
            }
            catch (Exception ex)
            {
                return this.BadRequestResponse<object>($"{await _messageService.GetMessageAsync("SERVER_ERROR", languageCode)}: {ex.Message}");
            }
        }

        [HttpPut("Update")]
        public async Task<IActionResult> UpdateBrandAsync([FromQuery] string userID, [FromBody] BrandUpdateDto dto, [FromQuery] string languageCode = "en")
        {
            try
            {
                if (string.IsNullOrWhiteSpace(userID))
                    userID = HttpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown_ip";

                var result = await _brandService.UpdateBrandAsync(userID, dto, languageCode);

                if (result <= 0)
                    return this.BadRequestResponse<object>(await _messageService.GetMessageAsync("OPERATION_FAILED", languageCode));

                return this.OkResponse(result, await _messageService.GetMessageAsync("BRAND_UPDATED", languageCode));
            }
            catch (Exception ex)
            {
                return this.BadRequestResponse<object>($"{await _messageService.GetMessageAsync("SERVER_ERROR", languageCode)}: {ex.Message}");
            }
        }

        [HttpPatch("Delete/{brandID:int}")]
        public async Task<IActionResult> SetActiveBrandAsync([FromQuery] string userID, int brandID, [FromQuery] bool isActive, string languageCode = "en")
        {
            try
            {
                if (string.IsNullOrWhiteSpace(userID))
                    userID = HttpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown_ip";

                await _brandService.SetActiveBrandAsync(userID, brandID, isActive);

                return this.OkResponse<object>(null!, await _messageService.GetMessageAsync("BRAND_DELETED", languageCode)
                );
            }
            catch (Exception ex)
            {
                return this.BadRequestResponse<object>($"{await _messageService.GetMessageAsync("SERVER_ERROR", languageCode)}: {ex.Message}");
            }
        }
    }
}
