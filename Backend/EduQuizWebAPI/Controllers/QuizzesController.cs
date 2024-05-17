using EduQuizDBAccess.Entities;
using EduQuizWebAPI.DTOs;
using EduQuizWebAPI.Models;
using EduQuizWebAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Any;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
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
            int newId = await _quizService.CreateQuiz(newQuiz);

            if (newId == -1)
            {
                return NotFound("User is not found");
            }

            return CreatedAtAction(nameof(CreateQuiz), newId);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<QuizModel>> UpdateQuiz(int id, JObject quiz)
        {
            Console.WriteLine(quiz.ToString());
            var newQuiz = JsonConvert.DeserializeObject<QuizModel>(quiz.ToString());

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

        [HttpGet]
        public async Task<ActionResult> GetQuizzes(int userId)
        {
            string result = await _quizService.GetAllQuiz(userId);

            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetQuizById(int id)
        {
            var quiz = await _quizService.GetQuizById(id);

            return Ok(quiz);
        }

        [HttpDelete("{id}")]
        public async Task DeleteQuiz(int id)
        {
            await _quizService.DeleteQuizById(id);

            return;
        }

        [HttpPost("share/{quizId}/group/{groupId}")]
        public async Task<ActionResult> ShareQuiz(int quizId, int groupId)
        {
            try
            {
                await _quizService.ShareQuiz(quizId, groupId);
            }
            catch (Exception ex)
            {
                return Conflict(ex);
            }

            return Ok();
        }

        [HttpGet("group/{groupId}")]
        public async Task<ActionResult> GetGroupQuizzes(int groupId)
        {
            string result = await _quizService.GetQuizzesByGroupId(groupId);

            return Ok(result);
        }

        [HttpPost("filled")]
        public async Task<IActionResult> SaveFilledData(FilledQuizModel model)
        {
            await this._quizService.CreateFilledQuiz(model);

            return Ok();
        }

        [HttpGet("bar-stats/{quizId}/user/{userId}")]
        public async Task<ActionResult> GetStatisticsBar(int quizId, int userId)
        {
            string stats = await _quizService.GetBarStatistics(quizId, userId);

            return Ok(stats);
        }

        [HttpGet("pie-stats/{quizId}/user/{userId}")]
        public async Task<ActionResult> GetStatisticsPie(int quizId, int userId)
        {
            string stats = await _quizService.GetPieStatistics(quizId, userId);

            return Ok(stats);
        }

        [HttpGet("unchecked/{creatorId}")]
        public async Task<ActionResult> GetUncheckedFilledQuizzes(int creatorId)
        {
            List<FilledQuizDto> result = await _quizService.GetUncheckedFilledQuizzes(creatorId);

            return Ok(result);
        }

        [HttpPut("checked/{quizId}")]
        public async Task<ActionResult<FilledQuiz>> SaveCheckedQuiz(int quizId, JObject quiz)
        {
            Console.WriteLine(quiz.ToString());
            var checkedQuiz = JsonConvert.DeserializeObject<FilledQuiz>(quiz.ToString());

            if (quizId != checkedQuiz.Id)
            {
                return BadRequest();
            }

            int result = await _quizService.SaveCheckedQuiz(checkedQuiz);

            if (result != 200)
            {
                return StatusCode(result);
            }

            return NoContent();
        }
    }
}
