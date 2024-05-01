using EduQuizDBAccess.Entities;

namespace EduQuizWebAPI.Models {
    public class QuizModel {
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;
        public DateTime CreationDate { get; set; }
        public ICollection<Question>? Questions { get; set; }
        public QuizSetting? Settings { get; set; }
    }
}
