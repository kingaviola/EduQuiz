using EduQuizWebAPI.Models;
using EduQuizWebAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Any;

namespace EduQuizWebAPI.Controllers {
    [ApiController]
    [Route("[controller]")]
    public class QuizzesController : ControllerBase {
        private readonly QuizService _quizService;

        public QuizzesController(QuizService quizService)
        {
            this._quizService = quizService;
        }

        [HttpPost]
        [Route("")]
        public async Task<ActionResult<QuizModel>> CreateQuiz(QuizModel newQuiz) 
        {
            int newId = _quizService.CreateQuiz(newQuiz);

            return CreatedAtAction(nameof(CreateQuiz), newQuiz);
        }
    }
}
