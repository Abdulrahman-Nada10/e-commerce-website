using CatalogService.Api.DTOs.Translations;
using CatalogService.Api.Services;
using CatalogService.Api.Services.Translations;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CatalogService.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TranslationsController(ITranslationService service, LocalizedMessageService messageService) : ControllerBase
    {
        private readonly ITranslationService _service = service;
        private readonly LocalizedMessageService _messageService = messageService;

        [HttpPost("set-category")]
        public async Task<IActionResult> SetCategory([FromBody] CategoryTranslationRequestDto dto)
        {
            await _service.SetEntityTranslationsAsync(new SetEntityTranslationsDto
            {
                RecordID = dto.CategoryID,
                TableName = "Lup_Categories",
                Columns =
            [
                new ColumnTranslationDto { ColumnName = "Title", LanguageCode = dto.LanguageCode, Value = dto.Title },
                new ColumnTranslationDto { ColumnName = "Description", LanguageCode = dto.LanguageCode, Value = dto.Description },
            ]
            });

            return Ok(await _messageService.GetMessageAsync("CATEGORY_TRANSLATION", dto.LanguageCode));
        }

        [HttpPost("set-brand")]
        public async Task<IActionResult> SetBrand([FromBody] BrandTranslationRequestDto dto)
        {
            await _service.SetEntityTranslationsAsync(new SetEntityTranslationsDto
            {
                RecordID = dto.BrandID,
                TableName = "Lup_Brands",
                Columns =
            [
                new ColumnTranslationDto { ColumnName = "Title", LanguageCode = dto.LanguageCode, Value = dto.Title },
                new ColumnTranslationDto { ColumnName = "Description", LanguageCode = dto.LanguageCode, Value = dto.Description }
            ]
            });

            return Ok(await _messageService.GetMessageAsync("BRAND_TRANSLATION", dto.LanguageCode));
        }

        [HttpPost("set-product")]
        public async Task<IActionResult> SetProduct([FromBody] ProductTranslationRequestDto dto)
        {
            await _service.SetEntityTranslationsAsync(new SetEntityTranslationsDto
            {
                RecordID = dto.ProductID,
                TableName = "Basic_Products",
                Columns =
            [
                new ColumnTranslationDto { ColumnName = "Title", LanguageCode = dto.LanguageCode, Value = dto.Title },
                new ColumnTranslationDto { ColumnName = "ShortDescription", LanguageCode = dto.LanguageCode, Value = dto.ShortDescription },
                new ColumnTranslationDto { ColumnName = "Description", LanguageCode = dto.LanguageCode, Value = dto.Description }
            ]
            });

            return Ok(await _messageService.GetMessageAsync("PRODUCT_TRANSLATION", dto.LanguageCode));
        }

        [HttpPost("set-slider")]
        public async Task<IActionResult> SetSlider([FromBody] SliderTranslationRequestDto dto)
        {
            await _service.SetEntityTranslationsAsync(new SetEntityTranslationsDto
            {
                RecordID = dto.SliderID,
                TableName = "Basic_Slider",
                Columns =
            [
                new ColumnTranslationDto { ColumnName = "ShortTitle", LanguageCode = dto.LanguageCode, Value = dto.ShortTitle },
                new ColumnTranslationDto { ColumnName = "LinkTitle", LanguageCode = dto.LanguageCode, Value = dto.LinkTitle }
            ]
            });

            return Ok(await _messageService.GetMessageAsync("SLIDER_TRANSLATION", dto.LanguageCode));
        }

        [HttpPost("set-page")]
        public async Task<IActionResult> SetPage([FromBody] PageTranslationRequestDto dto)
        {
            await _service.SetEntityTranslationsAsync(new SetEntityTranslationsDto
            {
                RecordID = dto.PageID,
                TableName = "Basic_Pages",
                Columns =
            [
                new ColumnTranslationDto { ColumnName = "Title", LanguageCode = dto.LanguageCode, Value = dto.Title },
                new ColumnTranslationDto { ColumnName = "Content", LanguageCode = dto.LanguageCode, Value = dto.Content }
            ]
            });

            return Ok(await _messageService.GetMessageAsync("PAGE_TRANSLATION", dto.LanguageCode));
        }

        [HttpPost("set-footer")]
        public async Task<IActionResult> SetFooter([FromBody] FooterMenuTranslationRequestDto dto)
        {
            await _service.SetEntityTranslationsAsync(new SetEntityTranslationsDto
            {
                RecordID = dto.FooterID,
                TableName = "Menu_Footer",
                Columns =
            [
                new ColumnTranslationDto { ColumnName = "LinkTitle", LanguageCode = dto.LanguageCode, Value = dto.LinkTitle }
            ]
            });

            return Ok(await _messageService.GetMessageAsync("FOOTER_TRANSLATION", dto.LanguageCode));
        }
    }
}
