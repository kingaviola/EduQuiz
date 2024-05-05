using EduQuizDBAccess.Entities;
using EduQuizWebAPI.Models;
using EduQuizWebAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Any;
using Newtonsoft.Json;
using System.Text.Json.Nodes;

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
        public async Task<ActionResult<QuizModel>> UpdateQuiz(int id, JsonObject quiz)
        {
            var newQuiz = JsonConvert.DeserializeObject<QuizModel>(quiz.ToString());
            //Console.WriteLine("-------------------halooooo--------------");
            //Console.WriteLine(quiz.ToString());
            //if (newQuiz != null)
            //{
            //    if (newQuiz.Questions != null)
            //    {
            //        foreach (var question in newQuiz.Questions)
            //        {
            //            foreach (var answer in question.Answers)
            //            {
            //                Console.WriteLine(question.Type);
            //                if (answer.AnswerText != null)
            //                {
            //                    Console.WriteLine(answer.AnswerText.ToString());
            //                }
            //            }
            //        }
            //    }
            //}


            if (id != newQuiz.Id)
            {
                return BadRequest();
            }

            int result = await _quizService.SaveQuiz(newQuiz);

            if (result != 200)
            {
                return StatusCode(result);
            }

            return NoContent();
        }
    }
}
