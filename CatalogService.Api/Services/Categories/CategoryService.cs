using CatalogService.Api.DTOs.Categories;
using CatalogService.Api.DTOs.Products;
using CatalogService.Api.Models;
using Dapper;
using Microsoft.Data.SqlClient;
using System.Data;

namespace CatalogService.Api.Services.Categories;

public class CategoryService : ICategoryService
{
    private readonly string _connectionString;

    public CategoryService(IConfiguration configuration)
    {
        if (configuration == null)
            throw new ArgumentNullException(nameof(configuration));

        _connectionString = configuration.GetConnectionString("DefaultConnection")
            ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found in configuration");
    }

    public async Task<IEnumerable<CategoryDto>> GetListAsync(string languageCode, string? search = null, bool? isActive = null)
    {
        try
        {
            using var connection = new SqlConnection(_connectionString);
            var parameters = new DynamicParameters();
            parameters.Add("@LanguageCode", languageCode);
            parameters.Add("@Search", search);
            parameters.Add("@IsActive", isActive);
            var result = await connection.QueryAsync<CategoryDto>(
                "dbo.sp_GetCategories",
                parameters,
                commandType: CommandType.StoredProcedure
            );

            return result;
        }
        catch (SqlException ex)
        {
            throw new Exception($"{ex.Message}", ex);
        }
        catch (Exception ex)
        {
            throw new Exception($"Error fetching category list: {ex.Message}", ex);
        }
    }

    public async Task<int> CreateAsync(string userID, CategoryCreateDto dto, string languageCode)
    {
        try
        {
            using var conn = new SqlConnection(_connectionString);
            var parameters = new DynamicParameters();
            parameters.Add("@UserId", userID);
            parameters.Add("@Title", dto.Title);
            parameters.Add("@Icon", dto.Icon);
            parameters.Add("@Description", dto.Description);
            parameters.Add("@DisplayOrder", dto.DisplayOrder);
            parameters.Add("@Translations", dto.Translations);
            parameters.Add("@LanguageCode", languageCode);

            var result = await conn.ExecuteScalarAsync<int>(
                "dbo.sp_CreateCategory",
                parameters,
                commandType: System.Data.CommandType.StoredProcedure
                );
            return result;
        }
        catch (SqlException ex)
        {
            throw new Exception($"{ex.Message}", ex);
        }
        catch (Exception ex)
        {
            throw new Exception($"Error creating category '{dto.Title}': {ex.Message}", ex);
        }
    }

    public async Task<int> UpdateAsync(string userID, CategoryUpdateDto dto, string languageCode)
    {
        try
        {
            using var conn = new SqlConnection(_connectionString);
            var parameters = new DynamicParameters();
            parameters.Add("@UserId", userID);
            parameters.Add("@CategoryID", dto.CategoryID);
            parameters.Add("@Title", dto.Title);
            parameters.Add("@Icon", dto.Icon);
            parameters.Add("@Description", dto.Description);
            parameters.Add("@DisplayOrder", dto.DisplayOrder);
            parameters.Add("@LanguageCode", languageCode);
            parameters.Add("@Translations", dto.Translations);

            await conn.ExecuteAsync("dbo.sp_UpdateCategory", parameters, commandType: System.Data.CommandType.StoredProcedure);
            return dto.CategoryID;
        }
        catch (SqlException ex)
        {
            throw new Exception($"{ex.Message}", ex);
        }
        catch (Exception ex)
        {
            throw new Exception($"Error updating category ID {dto.CategoryID}: {ex.Message}", ex);
        }
    }

    public async Task SetActiveAsync(string userID, int categoryID, bool isActive, string languageCode)
    {
        try
        {
            using var conn = new SqlConnection(_connectionString);
            await conn.ExecuteAsync(
                "dbo.sp_SetActiveCategory",
                new { UserId = userID, CategoryID = categoryID, IsActive = isActive, LanguageCode = languageCode },
                commandType: System.Data.CommandType.StoredProcedure
            );
        }
        catch (SqlException ex)
        {
            throw new Exception($"{ex.Message}", ex);
        }
        catch (Exception ex)
        {
            throw new Exception($"Error setting active={isActive} for category ID {categoryID}: {ex.Message}", ex);
        }
    }

    public Task<CategoryDto?> GetByIdAsync(int categoryID, string languageCode)
    {
        throw new NotImplementedException();
    }

    public Task DeleteAsync(long id)
    {
        throw new NotImplementedException();
    }
}
