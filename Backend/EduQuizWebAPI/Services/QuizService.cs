using EduQuizDBAccess.Data;
using EduQuizDBAccess.Entities;
using EduQuizWebAPI.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Collections;
using System.Text.Json.Nodes;

namespace EduQuizWebAPI.Services {
    public class QuizService {

        private readonly EduQuizContext _context;

        public QuizService(EduQuizContext context)
        {
            _context = context;
        }


        public async Task<int> CreateQuiz(QuizModel newQuiz)
        {
            var user = _context.Users.FirstOrDefault(u => u.Id == newQuiz.UserId);
            Quiz quiz = new Quiz();
            quiz.Name = newQuiz.Name;
            quiz.Description = newQuiz.Description;
            quiz.CreationDate = newQuiz.CreationDate;
            quiz.Questions = [];
            quiz.Settings = newQuiz.Settings;

            _context.Quizzes.Add(quiz);

            if (user == null)
            {
                return -1;
            }

            user.Quizzes = user.Quizzes ?? new List<Quiz>();
            user.Quizzes.Add(quiz);

            await _context.SaveChangesAsync();

            return quiz.Id;
        }

        public async Task<int> SaveQuiz(QuizModel quiz)
        {
            var oldQuiz = await _context.Quizzes.FindAsync(quiz.Id);
            if (oldQuiz == null)
            {
                return 404;
            }

            oldQuiz.Name = quiz.Name;
            oldQuiz.Description = quiz.Description;
            oldQuiz.Settings = quiz.Settings;

            if (quiz.Questions != null)
            {
                ICollection<Question> newQuestions = new List<Question>();

                foreach (var question in quiz.Questions)
                {
                    ICollection<AnswerOption> newAnswers = new List<AnswerOption>();

                    foreach (var answer in question.Answers)
                    {

                        if (answer != null)
                        {
                            switch (question.Type)
                            {
                                case "checkbox":
                                case "radio":
                                case "missingText":
                                    if (answer.Point != null && answer.Correctness != null && answer.AnswerText != null)
                                    {
                                        var sa = new SimpleAnswer
                                        {
                                            Point = (double)answer.Point,
                                            Correctness = (bool)answer.Correctness,
                                            Text = answer.AnswerText
                                        };
                                        //_context.Answers.Add(sa);
                                        newAnswers.Add(sa);
                                    }
                                    break;
                                case "rightOrder":
                                    if (answer.Point != null && answer.Order != null && answer.AnswerText != null)
                                        {
                                            var ra = new RightOrderAnswer
                                            {
                                                Point = (double)answer.Point,
                                                Order = (int)answer.Order,
                                                Text = answer.AnswerText
                                            };
                                            //_context.Answers.Add(ra);
                                            newAnswers.Add(ra);
                                        }
                                    break;
                                case "pairing":
                                    if (answer.Point != null && answer.Base != null && answer.Pair != null)
                                        {
                                            var pa = new PairingAnswer
                                            {
                                                Point = (double)answer.Point,
                                                Base = answer.Base,
                                                Pair = answer.Pair
                                            };
                                            //_context.Answers.Add(pa);
                                            newAnswers.Add(pa);
                                        }
                                    break;
                                case "freeText":
                                    if (answer.Point != null && answer.AnswerText != null)
                                        {
                                            var fa = new FreeTextAnswer
                                            {
                                                Point = (double)answer.Point,
                                                Text = answer.AnswerText
                                            };
                                            //_context.Answers.Add(fa);
                                            newAnswers.Add(fa);
                                        }
                                    break;
                                case "calculate":
                                    if (answer.Point != null && answer.Variables != null && answer.Result != null)
                                        {
                                            var ca = new CalculateAnswer
                                            {
                                                Point = (double)answer.Point,
                                                Variables = answer.Variables,
                                                Result = (double)answer.Result
                                            };
                                            //_context.Answers.Add(ca);
                                            newAnswers.Add(ca);
                                        }
                                    break;
                            }
                        }
                    }
                    var q = new Question
                    {
                        QuestionText = question.QuestionText,
                        Image = question.Image,
                        Type = question.Type,
                        Answers = newAnswers,
                    };
                    newQuestions.Add(q);
                }

                oldQuiz.Questions = newQuestions;
            }

            await _context.SaveChangesAsync();

            return 200;

        }

        public async Task<string> GetAllQuiz(int userId)
        {
            List<Quiz> quizzes = await _context.Users
                .Where(u => u.Id == userId)
                .SelectMany(u => u.Quizzes)
                    .Include(q => q.Settings)
                .ToListAsync();
            List<QuizCard> cardDatas = new List<QuizCard>();

            foreach (var quiz in quizzes)
            {
                var dueDate = "";
                
                if (quiz.Settings != null)
                {
                    Console.WriteLine(quiz.Settings.IsAnswerRandom);
                    if (quiz.Settings.IsDeadline == true)
                    {
                        dueDate = quiz.Settings.DeadlineDate.ToString() + quiz.Settings.DeadlineTime;
                    }
                }

                var cardData = new QuizCard
                {
                    Id = quiz.Id,
                    Name = quiz.Name,
                    Description = quiz.Description,
                    CreationDate = quiz.CreationDate,
                    Deadline = dueDate,
                    CreatorId = userId,
                };

                cardDatas.Add(cardData);
            }

            string json = JsonConvert.SerializeObject(cardDatas);

            return json;
        }

        public async Task<ActionResult<Quiz>> GetQuizByIdAsync(int id)
        {
            var quiz = await _context.Quizzes
                .Include(q => q.Settings)
                .Include(q => q.Questions)
                    .ThenInclude(q => q.Answers)
                .FirstOrDefaultAsync(q => q.Id == id);

            foreach (var question in quiz.Questions)
            {
                foreach(var answer in question.Answers)
                {
                    if(answer is CalculateAnswer calculateAnswer)
                    {
                        _context.Entry(calculateAnswer)
                            .Collection(q => q.Variables)
                            .Load();
                    }
                }
            }

            if (quiz == null)
            {
                return new NotFoundResult();
            }

            return quiz;
        }

        public async Task DeleteQuizById(int id)
        {
            var quiz = await _context.Quizzes
                .Include(q => q.Settings)
                .Include(q => q.Questions)
                    .ThenInclude(q => q.Answers)
                .FirstOrDefaultAsync(q => q.Id == id);

            foreach (var question in quiz.Questions)
            {
                foreach (var answer in question.Answers)
                {
                    if (answer is CalculateAnswer calculateAnswer)
                    {
                        _context.Entry(calculateAnswer)
                            .Collection(q => q.Variables)
                            .Load();
                    }
                }
            }

            _context.Quizzes.Remove(quiz);
            await _context.SaveChangesAsync();

            return;
        }

        public async Task ShareQuiz(int quizId, int groupId)
        {
            var quiz = await _context.Quizzes.FindAsync(quizId);
            
            if (quiz == null)
            {
                throw new Exception("Quiz is not found");
            }
            
            var group = await _context.Groups.FindAsync(groupId);

            if (group == null)
            {
                throw new Exception("Group is not found");
            }

            group.SharedQuizzes = group.SharedQuizzes ?? new List<Quiz>();
            group.SharedQuizzes.Add(quiz);

            await _context.SaveChangesAsync();
        }
    }
}
