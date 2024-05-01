//using EduQuizDBAccess.Data;
using EduQuizDBAccess.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EduQuizWebAPI.Controllers {
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase {

        private readonly EduQuizContext _context;

        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, EduQuizContext context)
        {
            _logger = logger;
            this._context = context;
        }

        [HttpGet(Name = "Quizzes")]
        //public IEnumerable<WeatherForecast> Get()
        public async Task<OkObjectResult> Get()
        {
            var quizzes = _context.Quizzes.ToList();

            //return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            //{
            //    Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            //    TemperatureC = Random.Shared.Next(-20, 55),
            //    Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            //})
            //.ToArray();
            Console.WriteLine("Haloooooo");
            Console.WriteLine(quizzes);
            return Ok(quizzes);
        }

        //[HttpGet]
        //[Route("")]
        //public async Task<OkObjectResult> GetQuiz()
        //{
        //    var quizzes = _context.Quizzes;

        //    return Ok(quizzes);
        //}
    }
}
