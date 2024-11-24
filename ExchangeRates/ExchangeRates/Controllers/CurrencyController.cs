using Microsoft.AspNetCore.Mvc;
namespace ExchangeRatesAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CurrencyController : ControllerBase
    {
        private readonly HttpClient _httpClient;
        private const string ApiKey = "b0cba1242cbaeedf39a56a3f";
        private const string BaseUrl = "https://v6.exchangerate-api.com/v6";

        public CurrencyController(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        [HttpGet("currencies")]
        public async Task<IActionResult> GetCurrencies()
        {
            try
            {
                var response = await _httpClient.GetAsync($"{BaseUrl}/{ApiKey}/latest/USD");
                response.EnsureSuccessStatusCode();

                var data = await response.Content.ReadFromJsonAsync<ExchangeRateResponse>();

                if (data?.conversion_rates != null)
                {
                    var currencies = data.conversion_rates.Keys.ToList();
                    return Ok(currencies);
                }

                return StatusCode(500, "Failed to fetch currencies");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("exchange-rates/{baseCurrency}")]
        public async Task<IActionResult> GetExchangeRates(string baseCurrency)
        {
            try
            {
                var response = await _httpClient.GetAsync($"{BaseUrl}/{ApiKey}/latest/{baseCurrency}");
                response.EnsureSuccessStatusCode();

                var data = await response.Content.ReadFromJsonAsync<ExchangeRateResponse>();

                if (data?.conversion_rates != null)
                {
                    return Ok(data.conversion_rates);
                }

                return StatusCode(500, "Failed to fetch exchange rates");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

    }

    public class ExchangeRateResponse
    {
        public string base_code { get; set; }
        public Dictionary<string, decimal> conversion_rates { get; set; }
    }

}

//using Microsoft.AspNetCore.Mvc;
//using System.Collections.Generic;

//namespace ExchangeRatesAPI.Controllers
//{
//    [ApiController]
//    [Route("api/[controller]")]
//    public class CurrencyController : ControllerBase
//    {
//        // API להחזרת רשימת מטבעות
//        [HttpGet("currencies")]
//        public IActionResult GetCurrencies()
//        {
//            var currencies = new[] { "USD", "EUR", "GBP", "CNY", "ILS" };
//            return Ok(currencies);
//        }

//        // API להחזרת שערי חליפין למטבע מסוים
//        [HttpGet("exchange-rates/{currency}")]
//        public IActionResult GetExchangeRates(string currency)
//        {
//            // שימוש ב-Dictionary לאחסון שערי החליפין
//            var exchangeRates = new Dictionary<string, Dictionary<string, double>>()
//            {
//                { "USD", new Dictionary<string, double> { { "USD", 1.0 }, { "EUR", 0.92 }, { "GBP", 0.81 }, { "CNY", 6.9 }, { "ILS", 3.55 } } },
//                { "EUR", new Dictionary<string, double> { { "USD", 1.09 }, { "EUR", 1.0 }, { "GBP", 0.88 }, { "CNY", 7.5 }, { "ILS", 3.85 } } },
//                { "GBP", new Dictionary<string, double> { { "USD", 1.23 }, { "EUR", 1.14 }, { "GBP", 1.0 }, { "CNY", 8.5 }, { "ILS", 4.4 } } },
//                { "CNY", new Dictionary<string, double> { { "USD", 0.14 }, { "EUR", 0.13 }, { "GBP", 0.12 }, { "CNY", 1.0 }, { "ILS", 0.51 } } },
//                { "ILS", new Dictionary<string, double> { { "USD", 0.28 }, { "EUR", 0.26 }, { "GBP", 0.23 }, { "CNY", 1.96 }, { "ILS", 1.0 } } }
//            };

//            // אם המטבע לא קיים במילון, מחזירים תשובה 404
//            if (!exchangeRates.ContainsKey(currency))
//            {
//                return NotFound($"Currency {currency} not found.");
//            }

//            // מחזירים את שערי החליפין של המטבע המבוקש
//            return Ok(exchangeRates[currency]);
//        }
//    }
//}
