using CatalogService.Api.DTOs;
using CatalogService.Api.Services;
using Microsoft.AspNetCore.Mvc;
using GlobalResponse.Shared.Extensions;
using GlobalResponse.Shared.Models;
using System.Data.SqlClient;

namespace CatalogService.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class CategoriesController(ICategoryService categoryService, ILogger<CategoriesController> logger) : ControllerBase
    {
        private readonly ICategoryService _categoryService = categoryService;
        private readonly ILogger<CategoriesController> _logger = logger;

        /// <summary>
        /// Get all categories with optional filters
        /// </summary>
        /// <param name="languageCode">Language code (default: en)</param>
        /// <param name="search">Search term for category title</param>
        /// <param name="isActive">Filter by active status</param>
        /// <returns>List of categories</returns>
        [HttpGet]
        [ProducesResponseType(typeof(ApiResponse<List<CategoryDto>>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetCategories(
            [FromQuery] string languageCode = "en",
            [FromQuery] string? search = null,
            [FromQuery] bool? isActive = null)
        {
            try
            {
                _logger.LogInformation(
                    "Fetching categories with language: {LanguageCode}, search: {Search}, isActive: {IsActive}",
                    languageCode, search, isActive);

                var categories = await _categoryService.GetCategoriesAsync(
                    languageCode,
                    search,
                    isActive);

                if (categories == null || !categories.Any())
                {
                    return ApiResponse<List<CategoryDto>>
                        .NotFoundResponse("No categories found")
                        .WithTraceId(HttpContext)
                        .ToActionResult();
                }

                var response = ApiResponse<List<CategoryDto>>
                    .SuccessResponse(
                        categories,
                        $"Retrieved {categories.Count} categories successfully")
                    .WithTraceId(HttpContext);

                return response.ToActionResult();
            }
            catch (SqlException sqlEx)
            {
                _logger.LogError(sqlEx, "Database error occurred while fetching categories");

                return ApiResponse<List<CategoryDto>>
                    .ErrorResponse(
                        "Database error occurred",
                        new List<string> { sqlEx.Message },
                        500)
                    .WithTraceId(HttpContext)
                    .ToActionResult();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error occurred while fetching categories");

                return ApiResponse<List<CategoryDto>>
                    .ErrorResponse(
                        "An unexpected error occurred",
                        new List<string> { ex.Message },
                        500)
                    .WithTraceId(HttpContext)
                    .ToActionResult();
            }
        }
    }
}
