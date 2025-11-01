using CatalogService.Api.DTOs;
using Dapper;
using Microsoft.Data.SqlClient;
using System.Data;

namespace CatalogService.Api.Services;

public class CategoryService : ICategoryService
{
    private readonly string _connectionString;

    public CategoryService(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("DefaultConnection")
            ?? throw new ArgumentNullException(nameof(configuration));
    }

    public async Task<List<CategoryDto>> GetCategoriesAsync(
        string languageCode = "en",
        string? search = null,
        bool? isActive = null)
    {
        using var connection = new SqlConnection(_connectionString);

        var parameters = new DynamicParameters();
        parameters.Add("@LanguageCode", languageCode);
        parameters.Add("@Search", search);
        parameters.Add("@IsActive", isActive);

        var categories = await connection.QueryAsync<CategoryDto>(
            "dbo.sp_GetCategories",
            parameters,
            commandType: CommandType.StoredProcedure
        );

        return [.. categories];
    }
}
