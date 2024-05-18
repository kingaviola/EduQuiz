namespace EduQuizWebAPI.DTOs {
    public class PairingAnswerDto : AnswerOptionDto {
        public string Base { get; set; } = null!;
        public string Pair { get; set; } = null!;
    }
}
