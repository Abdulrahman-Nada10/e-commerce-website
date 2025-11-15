using CatalogService.Api.DTOs.Products;
using CatalogService.Api.Services;
using CatalogService.Api.Services.Products;
using GlobalResponse.Shared.Extensions;
using Microsoft.AspNetCore.Mvc;
namespace CatalogService.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class ProductsController(IProductService productService, LocalizedMessageService messageService) : ControllerBase
{
    private readonly IProductService _productService = productService;
    private readonly LocalizedMessageService _messageService = messageService;


    [HttpGet]
    public async Task<IActionResult> GetListAsync(string languageCode = "en", string? search = null, int? categoryID = null, int? brandID = null, bool? isActive = null)
    {
        try
        {
            var products = await _productService.GeListAsync(languageCode, search, categoryID, brandID, isActive);

            if (products == null || !products.Any())
                return this.NotFoundResponse<object>(await _messageService.GetMessageAsync("PRODUCT_NOT_FOUND", languageCode));

            return this.OkResponse(products,await _messageService.GetMessageAsync("PRODUCTS_FETCH_SUCCESS", languageCode));
        }
        catch (Exception ex)
        {
            return this.BadRequestResponse<object>($"{await _messageService.GetMessageAsync("SERVER_ERROR", languageCode)}: {ex.Message}");
        }
    }

    [HttpGet("{productID:long}")]
    public async Task<IActionResult> GetByIdAsync(long productID, string languageCode = "en")
    {
        try
        {
            var product = await _productService.GetByIDAsync(productID, languageCode);

            if (product == null)
                return this.NotFoundResponse<object>(await _messageService.GetMessageAsync("PRODUCT_NOT_FOUND", languageCode));

            return this.OkResponse(product, await _messageService.GetMessageAsync("PRODUCTS_FETCH_SUCCESS", languageCode));
        }
        catch (Exception ex)
        {
            return this.BadRequestResponse<object>($"{await _messageService.GetMessageAsync("SERVER_ERROR", languageCode)}: {ex.Message}");
        }
    }

    [HttpGet("ByCategory/{categoryID:int}")]
    public async Task<IActionResult> GetByCategoryAsync(int categoryID, string languageCode = "en")
    {
        try
        {
            var product = await _productService.GetListByCategoryIDAsync(categoryID, languageCode);

            if (product == null)
                return this.NotFoundResponse<object>(await _messageService.GetMessageAsync("CATEGORY_NOT_FOUND", languageCode));

            return this.OkResponse(product, await _messageService.GetMessageAsync("PRODUCTS_FETCH_SUCCESS", languageCode));
        }
        catch (Exception ex)
        {
            return this.BadRequestResponse<object>($"{await _messageService.GetMessageAsync("SERVER_ERROR", languageCode)}: {ex.Message}");
        }
    }

    [HttpPost("Create")]
    public async Task<IActionResult> CreateAsync([FromHeader] string userID, [FromBody] ProductCreateDto dto, string languageCode = "en")
    {
        try
        {
            if (string.IsNullOrWhiteSpace(userID))
                userID = HttpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown_ip";
            
            var result = await _productService.CreateAsync(userID, dto, languageCode);
            if (result <= 0)
                return this.BadRequestResponse<object>(await _messageService.GetMessageAsync("OPERATION_FAILED", languageCode));

            return this.OkResponse(result, await _messageService.GetMessageAsync("CREATED_SUCCESSFULLY", languageCode));
        }
        catch (Exception ex)
        {
            return this.BadRequestResponse<object>($"{await _messageService.GetMessageAsync("SERVER_ERROR", languageCode)}: {ex.Message}");
        }
    }

    [HttpPut("Update")]
    public async Task<IActionResult> UpdateAsync([FromHeader] string userID, [FromBody] ProductUpdateDto dto, string languageCode = "en")
    {
        try
        {
            if (string.IsNullOrWhiteSpace(userID))
                userID = HttpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown_ip";
            
            var result = await _productService.UpdateAsync(userID, dto, languageCode);
            if (result <= 0)
                return this.BadRequestResponse<object>(await _messageService.GetMessageAsync("OPERATION_FAILED", languageCode));

            return this.OkResponse(result, await _messageService.GetMessageAsync("UPDATED_SUCCESSFULLY", languageCode));
        }
        catch (Exception ex)
        {
            return this.BadRequestResponse<object>($"{await _messageService.GetMessageAsync("SERVER_ERROR", languageCode)}: {ex.Message}");
        }
    }

    [HttpPatch("Delete/{productID:int}")]
    public async Task<IActionResult> SetActiveAsync([FromHeader] string userID, int productID, bool isActive, string languageCode = "en")
    {
        try
        {
            if (string.IsNullOrWhiteSpace(userID))
                userID = HttpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown_ip";
            
            await _productService.SetActiveAsync(userID, productID, isActive);

            return this.OkResponse<object>(null!,await _messageService.GetMessageAsync("PRODUCT_DELETED", languageCode));
        }
        catch (Exception ex)
        {
            return this.BadRequestResponse<object>($"{await _messageService.GetMessageAsync("SERVER_ERROR", languageCode)}: {ex.Message}");
        }
    }
}
