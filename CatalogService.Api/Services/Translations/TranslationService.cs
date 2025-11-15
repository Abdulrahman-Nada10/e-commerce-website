using CatalogService.Api.DTOs.Translations;
using Dapper;
using Microsoft.Data.SqlClient;
using System.Data;

namespace CatalogService.Api.Services.Translations;

public class TranslationService : ITranslationService
{
    private readonly string _connectionString;

    public TranslationService(IConfiguration configuration)
    {
        if (configuration == null)
            throw new ArgumentNullException(nameof(configuration));
        _connectionString = configuration.GetConnectionString("DefaultConnection")
            ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found in configuration");
    }

    public async Task SetEntityTranslationsAsync(SetEntityTranslationsDto dto)
    {
        if (dto == null || dto.Columns == null || dto.Columns.Count == 0)
            throw new ArgumentException("No translations provided.");
        using (var conn = new SqlConnection(_connectionString))
        {
            await conn.OpenAsync();

            foreach (var col in dto.Columns)
            {
                var param = new DynamicParameters();
                param.Add("@TableName", dto.TableName);
                param.Add("@RecordID", dto.RecordID);
                param.Add("@ColumnName", col.ColumnName);
                param.Add("@LanguageCode", col.LanguageCode);
                param.Add("@TranslatedValue", col.Value);

                await conn.ExecuteAsync(
                    "sp_SetTranslation",
                    param,
                    commandType: CommandType.StoredProcedure
                );
            }
        }
    }
}
