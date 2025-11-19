using CatalogService.Api.DTOs.Wishlist;
using Dapper;
using Microsoft.Data.SqlClient;
using System.Data;

namespace CatalogService.Api.Services.Wishlists
{
    public class WishlistService : IWishlistService
    {
        private readonly string _connectionString;

        public WishlistService(IConfiguration configuration)
        {
            if (configuration == null)
                throw new ArgumentNullException(nameof(configuration));
            _connectionString = configuration.GetConnectionString("DefaultConnection")
                ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found in configuration");
        }

        public async Task<long> AddAsync(string UserID, WishListCreateDto dto, string languageCode)
        {
            try
            {
                using var connection = new SqlConnection(_connectionString);

                var parameters = new DynamicParameters();
                parameters.Add("@UserId", UserID);
                parameters.Add("@ProductId", dto.ProductId);
                parameters.Add("@IsActive", dto.IsActive);
                parameters.Add("@DisplayOrder", dto.DisplayOrder);
                parameters.Add("@LanguageCode", languageCode);

                return await connection.ExecuteScalarAsync<long>(
                    "dbo.sp_WishList_Create",
                    parameters,
                    commandType: CommandType.StoredProcedure
                );
            }
            catch (Exception ex)
            {
                throw new Exception($"Error adding wishlist: {ex.Message}", ex);
            }
        }

        public async Task<bool> DeleteAsync(string userId, long wishListId, string languageCode)
        {
            try
            {
                using var connection = new SqlConnection(_connectionString);

                var parameters = new DynamicParameters();
                parameters.Add("@UserId", userId);
                parameters.Add("@WishListId", wishListId);
                parameters.Add("@LanguageCode", languageCode);

                await connection.ExecuteAsync(
                    "dbo.sp_WishList_Delete",
                    parameters,
                    commandType: CommandType.StoredProcedure
                );

                return true;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error deleting wishlist item: {ex.Message}", ex);
            }
        }

        public async Task<IEnumerable<WishListDto>> GetByUserAsync(string userId, string languageCode)
        {
            try
            {
                using var connection = new SqlConnection(_connectionString);

                var parameters = new DynamicParameters();
                parameters.Add("@UserId", userId);
                parameters.Add("@LanguageCode", languageCode);

                return await connection.QueryAsync<WishListDto>(
                    "dbo.sp_WishList_GetByUserID",
                    parameters,
                    commandType: CommandType.StoredProcedure
                );
            }
            catch (Exception ex)
            {
                throw new Exception($"Error fetching wishlist: {ex.Message}", ex);
            }
        }
    }
}
