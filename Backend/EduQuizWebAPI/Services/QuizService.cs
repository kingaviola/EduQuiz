using EduQuizDBAccess.Data;
using EduQuizDBAccess.Entities;
using EduQuizWebAPI.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Collections;

namespace EduQuizWebAPI.Services {
    public class QuizService {

        private readonly EduQuizContext _context;

        public QuizService(EduQuizContext context)
        {
            this._context = context;
        }


        public int CreateQuiz(QuizModel newQuiz)
        {
            Quiz quiz = new Quiz();
            quiz.Name = newQuiz.Name;
            quiz.Description = newQuiz.Description;
            quiz.CreationDate = newQuiz.CreationDate;
            //quiz.Questions = (ICollection<Question>?)newQuiz.Questions;
            quiz.Questions = [];
            quiz.Settings = newQuiz.Settings;

            _context.Quizzes.Add(quiz);
            _context.SaveChanges();

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

    }
}
