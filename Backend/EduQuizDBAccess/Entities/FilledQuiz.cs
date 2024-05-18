using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduQuizDBAccess.Entities {
    public class FilledQuiz {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int QuizId { get; set; }
        public int QuizCreatorId { get; set; }
        public bool IsChecked { get; set; }
        public ICollection<Question>? Questions { get; set; }
    }
}
