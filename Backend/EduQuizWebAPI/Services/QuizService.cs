using EduQuizDBAccess.Data;

namespace EduQuizWebAPI.Services {
    public class QuizService {

        private readonly EduQuizContext _context;

        public QuizService(EduQuizContext context)
        {
            _context = context;
        }


    }
}
