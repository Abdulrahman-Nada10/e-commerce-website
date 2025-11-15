using CatalogService.Api.DTOs.Products;
using Dapper;
using Microsoft.Data.SqlClient;
using System.Data;

namespace CatalogService.Api.Services.Products
{
    public class ProductService : IProductService
    {
        private readonly string _connectionString;
        public ProductService(IConfiguration configuration)
        {
            if (configuration == null)
                throw new ArgumentNullException(nameof(configuration));

            _connectionString = configuration.GetConnectionString("DefaultConnection")
                ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found in configuration");
        }


        // ✅ 1️⃣ Get list with filters
        public async Task<IEnumerable<ProductDto>> GeListAsync(string languageCode, string? search = null, int? categoryID = null, int? brandID = null, bool? isActive = null)
        {
            try
            {
                using var connection = new SqlConnection(_connectionString);
                var parameters = new DynamicParameters();
                parameters.Add("@LanguageCode", languageCode);
                parameters.Add("@CategoryID", categoryID);
                parameters.Add("@BrandID", brandID);
                parameters.Add("@Search", search);
                parameters.Add("@IsPublished", isActive);
                var result = await connection.QueryAsync<ProductDto>(
                    "dbo.sp_GetProducts",
                    parameters,
                    commandType: CommandType.StoredProcedure
                );

                return result;
            }
            catch (SqlException ex)
            {
                throw new Exception($"Database error in sp_GetProducts: {ex.Message}", ex);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error fetching product list: {ex.Message}", ex);
            }
        }

        // ✅ 2️⃣ Get by ID
        public async Task<ProductDto> GetByIDAsync(long productID, string languageCode)
        {
            try
            {
                using var connection = new SqlConnection(_connectionString);
                var parameters = new DynamicParameters();
                parameters.Add("@ProductID", productID);
                parameters.Add("@LanguageCode", languageCode);
                return (await connection.QueryFirstOrDefaultAsync<ProductDto>(
                    "dbo.sp_GetProductByID",
                    parameters,
                    commandType: CommandType.StoredProcedure
                ))!;
            }
            catch (SqlException ex)
            {
                throw new Exception($"Database error in sp_GetProductByID: {ex.Message}", ex);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error fetching product: {ex.Message}", ex);
            }
        }

        // ✅ 3️⃣ Get by Category ID
        public async Task<IEnumerable<ProductDto>> GetListByCategoryIDAsync(int categoryID, string languageCode)
        {
            try
            {
                using var connection = new SqlConnection(_connectionString);
                var parameters = new DynamicParameters();
                parameters.Add("@CategoryID", categoryID);
                parameters.Add("@LanguageCode", languageCode);
                return (await connection.QueryAsync<ProductDto>(
                    "dbo.sp_GetProducts",
                    parameters,
                    commandType: CommandType.StoredProcedure
                ))!;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error fetching product by category: {ex.Message}", ex);
            }
        }

        // ✅ 4️⃣ Create
        public async Task<int> CreateAsync(string userID, ProductCreateDto dto, string languageCode)
        {
            try
            {
                using var connection = new SqlConnection(_connectionString);
                var parameters = new DynamicParameters();
                parameters.Add("@UserId", userID);
                parameters.Add("@Title", dto.Title);
                parameters.Add("@Slug", dto.Slug);
                parameters.Add("@Description", dto.Description);
                parameters.Add("@ShortDescription", dto.ShortDescription);
                parameters.Add("@SKU", dto.SKU);
                parameters.Add("@Price", dto.Price);
                parameters.Add("@SalePrice", dto.SalePrice);
                parameters.Add("@Currency", dto.Currency);
                parameters.Add("@Quantity", dto.Quantity);
                parameters.Add("@BrandID", dto.BrandID);
                parameters.Add("@CategoryID", dto.CategoryID);
                parameters.Add("@ImageUrl", dto.ImageUrl);
                parameters.Add("@AltText", dto.AltText);
                parameters.Add("@LanguageCode", languageCode);
                var result = await connection.ExecuteScalarAsync<int>(
                    "dbo.sp_CreateProduct",
                    parameters,
                    commandType: CommandType.StoredProcedure
                );

                return result;
            }
            catch (SqlException ex)
            {
                throw new Exception($"Database error in sp_CreateProduct: {ex.Message}", ex);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error creating product: {ex.Message}", ex);
            }
        }

        // ✅ 5️⃣ Update
        public async Task<int> UpdateAsync(string userID, ProductUpdateDto dto, string languageCode)
        {
            try
            {
                using var connection = new SqlConnection(_connectionString);
                var parameters = new DynamicParameters();
                parameters.Add("@UserId", userID);
                parameters.Add("@Title", dto.Title);
                parameters.Add("@Slug", dto.Slug);
                parameters.Add("@Description", dto.Description);
                parameters.Add("@ShortDescription", dto.ShortDescription);
                parameters.Add("@SKU", dto.SKU);
                parameters.Add("@Price", dto.Price);
                parameters.Add("@SalePrice", dto.SalePrice);
                parameters.Add("@Currency", dto.Currency);
                parameters.Add("@Quantity", dto.Quantity);
                parameters.Add("@BrandID", dto.BrandID);
                parameters.Add("@CategoryID", dto.CategoryID);
                parameters.Add("@Translations", System.Text.Json.JsonSerializer.Serialize(dto.TranslationsJson));
                parameters.Add("@LanguageCode", languageCode);
                var result = await connection.ExecuteScalarAsync<int>(
                    "dbo.sp_UpdateProduct",
                    new
                    {
                        UserId = userID,
                        dto.ProductID,
                        dto.Title,
                        dto.Slug,
                        dto.Description,
                        dto.ShortDescription,
                        dto.SKU,
                        dto.Price,
                        dto.SalePrice,
                        dto.Currency,
                        dto.Quantity,
                        dto.BrandID,
                        dto.CategoryID,
                        Translations = dto.TranslationsJson != null ? System.Text.Json.JsonSerializer.Serialize(dto.TranslationsJson) : null
                    },
                    commandType: CommandType.StoredProcedure
                );

                return result;
            }
            catch (SqlException ex)
            {
                throw new Exception($"Database error in sp_UpdateProduct: {ex.Message}", ex);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error updating product: {ex.Message}", ex);
            }
        }

        // ✅ 6️⃣ Set Active
        public async Task SetActiveAsync(string userID, int productID, bool isActive)
        {
            try
            {
                using var connection = new SqlConnection(_connectionString);
                var parameters = new DynamicParameters();
                parameters.Add("@UserId", userID);
                parameters.Add("@ProductId", productID);
                parameters.Add("@IsActive", isActive);
                await connection.ExecuteAsync(
                    "dbo.sp_SetActiveProduct_v2",
                    parameters,
                    commandType: CommandType.StoredProcedure
                );
            }
            catch (SqlException ex)
            {
                throw new Exception($"Database error in sp_SetActiveProduct_v2: {ex.Message}", ex);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error updating active state: {ex.Message}", ex);
            }
        }

        // ✅ 7️⃣ Delete
        public async Task DeleteAsync(long productID)
        {
            try
            {
                using var connection = new SqlConnection(_connectionString);
                await connection.ExecuteAsync(
                    "DELETE FROM dbo.Basic_Products WHERE ProductID = @ProductID",
                    new { ProductID = productID }
                );
            }
            catch (SqlException ex)
            {
                throw new Exception($"Database error deleting product: {ex.Message}", ex);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error deleting product: {ex.Message}", ex);
            }
        }
    }
}
