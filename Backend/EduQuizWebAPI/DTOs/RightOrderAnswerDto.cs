namespace EduQuizWebAPI.DTOs {
    public class RightOrderAnswerDto : AnswerOptionDto {
        public int Order { get; set; }
        public string AnswerText { get; set; } = null!;
    }
}
