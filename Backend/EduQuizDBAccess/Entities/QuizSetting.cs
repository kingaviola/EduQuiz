using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduQuizDBAccess.Entities {
    public class QuizSetting {
        public int Id { get; set; }
        public bool IsQuestionRandom { get; set; }
        public bool IsAnswerRandom { get; set; }
        public bool UseAllQuestion { get; set; }
        public int UsedQuestions { get; set; }
        public bool IsStart {  get; set; }
        public string StartTime { get; set; } = null!;
        public DateTime StartDate { get; set; }
        public bool IsDeadline { get; set; }
        public string DeadlineTime { get; set; } = null!;
        public DateTime DeadlineDate { get; set; }
        public bool IsDuration { get; set; }
        public int Duration {  get; set; }
        public bool ShowAnswers { get; set; }
    }
}
