using EduQuizDBAccess.Data;
using EduQuizDBAccess.Entities;
using EduQuizWebAPI.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

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
            quiz.Questions = newQuiz.Questions;
            quiz.Settings = newQuiz.Settings;

            _context.Quizzes.Add(quiz);
            _context.SaveChanges();

            return quiz.Id;
        }

        public async Task<int> UpdateQuiz(QuizModel quiz)
        {
            Console.WriteLine("SERVICEBE IS ELJUTOTTAM");
            //TODO: végig iterálni a kérdéseken és a válaszlehetőségeken, mert azért nem megy
            //lehet csak be kell rakni a plusz id-t a frontend oldali modellekbe, ahogy itt van és akkor jó. 

            var oldQuiz = await _context.Quizzes.FindAsync(quiz.Id);
            if (oldQuiz == null)
            {
                return 505;
            }

            oldQuiz.Name = quiz.Name;
            oldQuiz.Description = quiz.Description;
            oldQuiz.Questions = quiz.Questions;
            oldQuiz.Settings = quiz.Settings;

            await _context.SaveChangesAsync();

            return 200;

        }

    }
}
