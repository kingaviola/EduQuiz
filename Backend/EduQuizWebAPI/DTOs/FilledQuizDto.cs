using EduQuizWebAPI.Models;

namespace EduQuizWebAPI.DTOs {
    public class FilledQuizDto {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int QuizId { get; set; }
        public int QuizCreatorId { get; set; }
        public bool IsChecked { get; set; }
        public ICollection<QuestionDto>? Questions { get; set; }
    }
}
