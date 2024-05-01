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


        public void CreateQuiz(QuizModel newQuiz)
        {
            Quiz quiz = new Quiz();
            quiz.Name = newQuiz.Name;
            quiz.Description = newQuiz.Description;
            quiz.CreationDate = newQuiz.CreationDate;
            quiz.Questions = newQuiz.Questions;
            quiz.Settings = newQuiz.Settings;

            _context.Quizzes.Add(quiz);
            _context.SaveChanges();
        }

    }
}
