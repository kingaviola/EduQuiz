using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduQuizDBAccess.Entities {
    public class Question {
        public int Id { get; set; }
        public string QuestionText { get; set; } = null!;
        public Image? Image { get; set; }
        public string Type { get; set; } = null!;
        public ICollection<AnswerOption> Answers { get; set; } = null!;
    }
}
