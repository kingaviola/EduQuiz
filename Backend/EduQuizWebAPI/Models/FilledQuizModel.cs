using EduQuizDBAccess.Entities;

namespace EduQuizWebAPI.Models {
    public class FilledQuizModel {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int QuizId { get; set; }
        public string QuizName { get; set; } = null!;
        public int QuizCreatorId { get; set; }
        public bool IsChecked { get; set; }
        public ICollection<QuestionModel>? Questions { get; set; }
    }
}
