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
        public async Task<ActionResult<QuizModel>> CreateQuiz(QuizModel newQuiz) 
        {
            int newId = _quizService.CreateQuiz(newQuiz);

            return CreatedAtAction(nameof(CreateQuiz), newId);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<QuizModel>> UpdateQuiz(int id, QuizModel quiz)
        {
            if(id != quiz.Id)
            {
                return BadRequest();
            }

            Console.WriteLine("IDE ELJUTOTTAM");

            int result = await _quizService.UpdateQuiz(quiz);

            if (result != 200)
            {
                return StatusCode(result);
            }

            return NoContent();
        }
    }
}
