using EduQuizDBAccess.Entities;

namespace EduQuizWebAPI.Models {
    public class QuestionModel {
        public int Id { get; set; }
        public string QuestionText { get; set; } = null!;
        public Image? Image { get; set; }
        public string Type { get; set; } = null!;
        public ICollection<AnswerModel> Answers { get; set; } = null!;
    }
}
