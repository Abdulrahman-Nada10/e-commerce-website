using CatalogService.Api.DTOs.Wishlist;
using CatalogService.Api.Services;
using CatalogService.Api.Services.Wishlists;
using GlobalResponse.Shared.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace CatalogService.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WishlistsController(IWishlistService wishListService, LocalizedMessageService messageService) : ControllerBase
    {
        private readonly IWishlistService _wishListService = wishListService;
        private readonly LocalizedMessageService _messageService = messageService;

        [HttpPost("add")]
        public async Task<IActionResult> Add([FromBody] WishListCreateDto dto, [FromQuery] string userID,  string languageCode = "en")
        {
            try
            {
                if (userID == null)
                    return this.UnauthorizedResponse<object>(await _messageService.GetMessageAsync("USER_NOT_FOUND", languageCode));

                var id = await _wishListService.AddAsync(userID, dto, languageCode);

                return this.OkResponse(new { WishListID = id }, await _messageService.GetMessageAsync("WISHLIST_ITEM_ADDED", languageCode));
            }
            catch (Exception ex)
            {
                return this.BadRequestResponse<object>($"{await _messageService.GetMessageAsync("SERVER_ERROR", languageCode)}: {ex.Message}");
            }
        }

        [HttpGet("my")]
        public async Task<IActionResult> GetMyWishList([FromQuery] string userID, [FromQuery] string languageCode = "en")
        {
            try
            {
                if (userID == null)
                    return this.UnauthorizedResponse<object>(await _messageService.GetMessageAsync("USER_NOT_FOUND", languageCode));

                var items = await _wishListService.GetByUserAsync(userID, languageCode);

                return this.OkResponse(items, await _messageService.GetMessageAsync("WISHLIST_FETCH_SUCCESS", languageCode));
            }
            catch (Exception ex)
            {
                return this.BadRequestResponse<object>($"{await _messageService.GetMessageAsync("SERVER_ERROR", languageCode)}: {ex.Message}");
            }
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(long id, [FromQuery] string userID, [FromQuery] string languageCode = "en")
        {
            try
            {
                if (userID == null)
                    return this.UnauthorizedResponse<object>(await _messageService.GetMessageAsync("USER_NOT_FOUND", languageCode));

                await _wishListService.DeleteAsync(userID, id, languageCode);

                return this.OkResponse<object>(null!, await _messageService.GetMessageAsync("WISHLIST_ITEM_REMOVED", languageCode));
            }
            catch (Exception ex)
            {
                return this.BadRequestResponse<object>($"{await _messageService.GetMessageAsync("SERVER_ERROR", languageCode)}: {ex.Message}");
            }
        }
    }
}
