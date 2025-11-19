using CatalogService.Api.DTOs.RelatedProducts;
using Dapper;
using Microsoft.Data.SqlClient;
using System.Data;

namespace CatalogService.Api.Services.RelatedProducts
{
    public class RelatedProdService : IRelatedProdService
    {
        private readonly string _connectionString;
        public RelatedProdService(IConfiguration configuration)
        {
            if(configuration == null)
                throw new ArgumentNullException(nameof(configuration));
            _connectionString = configuration.GetConnectionString("DefaultConnection")
                ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found in configuration");
        }
        public async Task<long> CreateAsync(string userId, RelatedCreateDto dto, string languageCode)
        {
            try
            {
                using var connection = new SqlConnection(_connectionString);
                var parameters = new DynamicParameters();
                parameters.Add("@UserId", userId);
                parameters.Add("@MainProductID", dto.MainProductID);
                parameters.Add("@RelatedProductID", dto.RelatedProductID);
                parameters.Add("@DisplayOrder", dto.DisplayOrder);
                parameters.Add("@IsActive", dto.IsActive);
                parameters.Add("@LangCode", languageCode);
                var result = await connection.ExecuteScalarAsync<long>(
                    "dbo.sp_RelatedProduct_Create",
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
                throw new Exception($"Error creating related product: {ex.Message}", ex);
            }
        }

        public async Task<IEnumerable<RelatedDto>> GetListAsync(string languageCode, string? search = null, bool? isActive = null)
        {
            try
            {
                using var connection = new SqlConnection(_connectionString);
                var parameters = new DynamicParameters();
                parameters.Add("@LanguageCode", languageCode);
                parameters.Add("@Search", search);
                parameters.Add("@IsActive", isActive);
                return (await connection.QueryAsync<RelatedDto>(
                    "dbo.sp_RelatedProduct_GetList",
                    parameters,
                    commandType: CommandType.StoredProcedure
                ))!;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error fetching related product: {ex.Message}", ex);
            }
        }

        public async Task SetActiveAsync(string userID, long ID, bool isActive)
        {
            try
            {
                using var connection = new SqlConnection(_connectionString);
                var parameters = new DynamicParameters();
                parameters.Add("@UserId", userID);
                parameters.Add("@ID", ID);
                parameters.Add("@IsActive", isActive);
                await connection.ExecuteAsync(
                    "dbo.sp_RelatedProduct_SetActive",
                    parameters,
                    commandType: CommandType.StoredProcedure
                );
            }
            catch (SqlException ex)
            {
                throw new Exception($"Database error in sp_RelatedProduct_SetActive: {ex.Message}", ex);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error updating active state: {ex.Message}", ex);
            }
        }

        public async Task<long> UpdateAsync(string userID, RelatedUpdateDto dto)
        {
            try
            {
                using var connection = new SqlConnection(_connectionString);
                var parameters = new DynamicParameters();
                parameters.Add("@UserId", userID);
                parameters.Add("@ID", dto.ID);
                parameters.Add("@MainProductID", dto.MainProductID);
                parameters.Add("@RelatedProductID", dto.RelatedProductID);
                parameters.Add("@DisplayOrder", dto.DisplayOrder);
                var result = await connection.ExecuteScalarAsync<int>(
                    "dbo.sp_RelatedProduct_Update",
                    parameters,
                    commandType: CommandType.StoredProcedure
                );

                return result;
            }
            catch (SqlException ex)
            {
                throw new Exception($"Database error in sp_RelatedProduct_Update: {ex.Message}", ex);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error updating related product: {ex.Message}", ex);
            }
        }
    }
}
