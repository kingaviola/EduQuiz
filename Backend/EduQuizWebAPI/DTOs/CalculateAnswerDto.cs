using EduQuizDBAccess.Entities;

namespace EduQuizWebAPI.DTOs {
    public class CalculateAnswerDto : AnswerOptionDto {
        public ICollection<VariableDto> Variables { get; set; } = null!;
        public double Result { get; set; }
    }
}
