﻿using AutoMapper;
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
using AutoMapper.QueryableExtensions;
using EduQuizWebAPI.DTOs;
using EduQuizDBAccess.Entities;

namespace EduQuizWebAPI.Services {
    public class QuizService {

        private readonly EduQuizContext _context;
        private readonly IMapper _mapper;

        public QuizService(EduQuizContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task CreateFilledQuiz(FilledQuizModel filled)
        {
            FilledQuiz newFilled = new FilledQuiz();
            newFilled.UserId = filled.UserId;
            newFilled.QuizId = filled.QuizId;
            newFilled.QuizCreatorId = filled.QuizCreatorId;
            newFilled.IsChecked = filled.IsChecked;
            newFilled.Questions = new List<Question>();

            foreach (var question in filled.Questions)
            {
                var newQuestion = new Question
                {
                    QuestionText = question.QuestionText,
                    Image = question.Image,
                    Type = question.Type,
                    Answers = new List<AnswerOption>()
                };

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
                                    newQuestion.Answers.Add(sa);
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
                                    newQuestion.Answers.Add(ra);
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
                                    newQuestion.Answers.Add(pa);
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
                                    newQuestion.Answers.Add(fa);
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
                                    newQuestion.Answers.Add(ca);
                                }
                                break;
                        }
                    }
                }
                newFilled.Questions.Add(newQuestion);
            }

            await _context.FilledQuizzes.AddAsync(newFilled);

            await _context.SaveChangesAsync();
        }


        public async Task<int> CreateQuiz(QuizModel newQuiz)
        {
            var user = _context.Users.FirstOrDefault(u => u.Id == newQuiz.UserId);
            Quiz quiz = new Quiz();
            quiz.CreatorId = newQuiz.UserId;
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

            oldQuiz.CreatorId = quiz.UserId;
            oldQuiz.Name = quiz.Name;
            oldQuiz.Description = quiz.Description;
            oldQuiz.Settings = quiz.Settings;

            if (quiz.Questions != null)
            {
                ICollection<Question> newQuestions = new List<Question>();

                foreach (var question in quiz.Questions)
                {
                    ICollection<AnswerOption> newAnswers = new List<AnswerOption>();
                    Console.WriteLine("saving... " + question.Type);

                    foreach (var answer in question.Answers)
                    {
                        Console.WriteLine("saving answer... " + answer);
                        if (answer != null)
                        {
                            switch (question.Type)
                            {
                                case "checkbox":
                                case "radio":
                                case "missingText":
                                    if (answer.Point != null && answer.Correctness != null && answer.AnswerText != null)
                                    {
                                        Console.WriteLine("checkbox, radio, missing");
                                        var sa = new SimpleAnswer
                                        {
                                            Point = (double)answer.Point,
                                            Correctness = (bool)answer.Correctness,
                                            Text = answer.AnswerText
                                        };
                                        newAnswers.Add(sa);
                                    }
                                    break;
                                case "rightOrder":
                                    if (answer.Point != null && answer.Order != null && answer.AnswerText != null)
                                        {
                                        Console.WriteLine("rightOrder");
                                        var ra = new RightOrderAnswer
                                            {
                                                Point = (double)answer.Point,
                                                Order = (int)answer.Order,
                                                Text = answer.AnswerText
                                            };
                                            newAnswers.Add(ra);
                                        }
                                    break;
                                case "pairing":
                                    if (answer.Point != null && answer.Base != null && answer.Pair != null)
                                        {
                                        Console.WriteLine("pairing");
                                        var pa = new PairingAnswer
                                            {
                                                Point = (double)answer.Point,
                                                Base = answer.Base,
                                                Pair = answer.Pair
                                            };
                                            newAnswers.Add(pa);
                                        }
                                    break;
                                case "freeText":
                                    if (answer.Point != null && answer.AnswerText != null)
                                        {
                                        Console.WriteLine("free");
                                        var fa = new FreeTextAnswer
                                            {
                                                Point = (double)answer.Point,
                                                Text = answer.AnswerText
                                            };
                                            newAnswers.Add(fa);
                                        }
                                    break;
                                case "calculate":
                                    if (answer.Point != null && answer.Variables != null && answer.Result != null)
                                        {
                                        Console.WriteLine("calc");
                                        var ca = new CalculateAnswer
                                            {
                                                Point = (double)answer.Point,
                                                Variables = answer.Variables,
                                                Result = (double)answer.Result
                                            };
                                            newAnswers.Add(ca);
                                        }
                                    break;
                            }
                        }
                    }

                    Console.WriteLine("newanswers: ", newAnswers);    
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

            List<QuizCard> cardDatas = this.getQuizCards(quizzes, userId);

            string json = JsonConvert.SerializeObject(cardDatas);

            return json;
        }

        private List<QuizCard> getQuizCards(List<Quiz> quizzes, int userId)
        {
            List<QuizCard> cardDatas = new List<QuizCard>();

            foreach (var quiz in quizzes)
            {
                var dueDate = "";

                if (quiz.Settings != null)
                {
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

            return cardDatas;
        }

        public async Task<string> GetQuizzesByGroupId(int groupId)
        {
            var quizzes = await _context.Quizzes
                .Where(q => q.Groups.Any(g => g.Id == groupId))
                    .Include(q => q.Settings)
                .ToListAsync();

            //TODO: userId
            int userId = 9;

            List<QuizCard> cardDatas = this.getQuizCards(quizzes, userId);

            string json = JsonConvert.SerializeObject(cardDatas);

            return json;
        }

        public async Task<ActionResult<QuizDto>> GetQuizById(int id)
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

            var quizDto = _mapper.Map<Quiz, QuizDto>(quiz);

            return quizDto;
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

        public async Task<List<StatisticsBarModel>> GetStatistics(int quizId, int userId)
        {
            var originalQuiz = await _context.Quizzes
                .Include(q => q.Settings)
                .Include(q => q.Questions)
                    .ThenInclude(q => q.Answers)
                .FirstOrDefaultAsync(q => q.Id == quizId);

            foreach (var question in originalQuiz.Questions)
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

            Console.WriteLine("original quiz ", originalQuiz);

            var filledQuizzes = await _context.FilledQuizzes
                .Where(q => q.UserId == userId && q.QuizId == quizId)
                .Include(q => q.Questions)
                    .ThenInclude(q => q.Answers)
                .ToListAsync();


            foreach(var filledQuiz in filledQuizzes)
            {
                foreach (var question in filledQuiz.Questions)
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
            }

            Console.WriteLine("filled quizes ", filledQuizzes);

            var stats = this.CheckQuiz(originalQuiz, filledQuizzes);

            return stats;
        }

        public List<StatisticsBarModel> CheckQuiz(Quiz original, List<FilledQuiz> filledQuizzes)
        {
            List<StatisticsBarModel> allStats = new List<StatisticsBarModel>();

            foreach (var filledQuiz in filledQuizzes)
            {
                var stats = GenereteBarStats(original, filledQuiz);

                allStats.AddRange(stats);
            }

            return allStats;
        }

        public List<StatisticsBarModel> GenereteBarStats(Quiz original, FilledQuiz filled)
        {
            Dictionary<int, int> good = new Dictionary<int, int>();
            Dictionary<int, int> bad = new Dictionary<int, int>();

            foreach (var question in original.Questions)
            {
                good[question.Id] = 0;
                bad[question.Id] = 0;
            }

            var originalQuestions = original.Questions.ToList();
            var filledQuestions = filled.Questions.ToList();

            for (var qi = 0; qi < originalQuestions.Count; qi++)
            {
                var originalAnswers = originalQuestions[qi].Answers.ToList();
                var filledAnswers = filledQuestions[qi].Answers.ToList();

                for (var ai = 0; ai < originalAnswers.Count; ai++)
                {
                    if (originalAnswers[ai].Point == filledAnswers[ai].Point)
                    {
                        good[originalQuestions[qi].Id]++;
                    }
                    else
                    {
                        bad[originalQuestions[qi].Id]++;
                    }
                }
            }

            List<StatisticsBarModel> stats = new List<StatisticsBarModel>();

            for (int i = 0; i < originalQuestions.Count; i++)
            {
                var barStatModel = new StatisticsBarModel
                {
                    Name = $"Question {i + 1}",
                    Series = new List<StatisticsBaseModel>()
                };

                int goodCount = good.ContainsKey(originalQuestions[i].Id) ? good[originalQuestions[i].Id] : 0;
                int badCount = bad.ContainsKey(originalQuestions[i].Id) ? bad[originalQuestions[i].Id] : 0;

                barStatModel.Series.Add(new StatisticsBaseModel { Name = "good", Value = goodCount });
                barStatModel.Series.Add(new StatisticsBaseModel { Name = "bad", Value = badCount });

                stats.Add(barStatModel);
            }

            return stats;
        }
    }
}
