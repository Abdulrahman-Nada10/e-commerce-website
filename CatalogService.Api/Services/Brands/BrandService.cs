using CatalogService.Api.DTOs.Brands;
using Dapper;
using Microsoft.Data.SqlClient;
using System.Data;

namespace CatalogService.Api.Services.Brands
{
    public class BrandService : IBrandService
    {
        private readonly string _connectionString;

        public BrandService(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection")
                ?? throw new InvalidOperationException("Missing connection string");
        }

        public async Task<IEnumerable<BrandDto>> GetBrandsAsync(string languageCode, string? search = null, bool? isActive = null)
        {
            try
            {
                using var connection = new SqlConnection(_connectionString);
                var parameters = new DynamicParameters();
                parameters.Add("@LanguageCode", languageCode);
                parameters.Add("@Search", search);
                parameters.Add("@IsActive", isActive);

                var result = await connection.QueryAsync<BrandDto>(
                    "dbo.sp_GetBrands",
                    parameters,
                    commandType: CommandType.StoredProcedure);

                return result;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error fetching brands: {ex.Message}", ex);
            }
        }

        public async Task<int> CreateBrandAsync(string userId, BrandCreateDto dto, string languageCode)
        {
            try
            {
                using var connection = new SqlConnection(_connectionString);
                var parameters = new DynamicParameters();
                parameters.Add("@UserId", userId);
                parameters.Add("@Title", dto.Title);
                parameters.Add("@Description", dto.Description);
                parameters.Add("@DisplayOrder", dto.DisplayOrder);
                parameters.Add("@Translations", dto.TranslationsJson);
                parameters.Add("@LanguageCode", languageCode);

                return await connection.ExecuteScalarAsync<int>(
                    "dbo.sp_CreateBrand",
                    parameters,
                    commandType: CommandType.StoredProcedure);
            }
            catch (SqlException ex)
            {
                throw new Exception($"SQL error while creating brand: {ex.Message}", ex);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error creating brand: {ex.Message}", ex);
            }
        }

        public async Task<int> UpdateBrandAsync(string userId, BrandUpdateDto dto, string languageCode)
        {
            try
            {
                using var connection = new SqlConnection(_connectionString);
                var parameters = new DynamicParameters();
                parameters.Add("@UserId", userId);
                parameters.Add("@BrandID", dto.BrandID);
                parameters.Add("@Title", dto.Title);
                parameters.Add("@Description", dto.Description);
                parameters.Add("@DisplayOrder", dto.DisplayOrder);
                parameters.Add("@Translations", dto.TranslationsJson);

                return await connection.ExecuteScalarAsync<int>(
                    "dbo.sp_UpdateBrand",
                    parameters,
                    commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error updating brand: {ex.Message}", ex);
            }
        }

        public async Task SetActiveBrandAsync(string userId, int brandId, bool isActive)
        {
            try
            {
                using var connection = new SqlConnection(_connectionString);
                var parameters = new DynamicParameters();
                parameters.Add("@UserId", userId);
                parameters.Add("@BrandID", brandId);
                parameters.Add("@IsActive", isActive);

                await connection.ExecuteAsync(
                    "dbo.sp_SetActiveBrand",
                    parameters,
                    commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error updating brand status: {ex.Message}", ex);
            }
        }

        public Task<BrandDto> GetBrandByIdAsync(long BrandID, string languageCode)
        {
            throw new NotImplementedException();
        }

        public Task DeleteAsync(long id)
        {
            throw new NotImplementedException();
        }
    }
}
