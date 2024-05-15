namespace EduQuizWebAPI.DTOs {
    public class SimpleAnswerDto : AnswerOptionDto {
        public bool Correctness { get; set; }
        public string AnswerText { get; set; } = null!;
    }
}
