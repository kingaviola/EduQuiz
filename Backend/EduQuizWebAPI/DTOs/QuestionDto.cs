using EduQuizDBAccess.Entities;

namespace EduQuizWebAPI.DTOs {
    public class QuestionDto {
        public int Id { get; set; }
        public string QuestionText { get; set; } = null!;
        public Image? Image { get; set; }
        public string Type { get; set; } = null!;
        public ICollection<AnswerOptionDto> Answers { get; set; } = null!;
    }
}
