using EduQuizDBAccess.Data;
using EduQuizDBAccess.Entities;
using EduQuizWebAPI.Models;

namespace EduQuizWebAPI.Services {
    public class QuizService {

        private readonly EduQuizContext _context;

        public QuizService(EduQuizContext context)
        {
            this._context = context;
        }


        public int CreateQuiz(QuizModel newQuiz)
        {
            var quizzes = _context.Quizzes;
            int newId = quizzes.Count() + 1;

            Console.WriteLine(newId);

            Quiz quiz = new Quiz();
            //quiz.Id = newId;
            quiz.Name = newQuiz.Name;
            quiz.Description = newQuiz.Description;
            quiz.Questions = newQuiz.Questions;
            quiz.Settings = newQuiz.Settings;

            _context.Quizzes.Add(quiz);
            _context.SaveChanges();

            return newId;
        }

    }
}
