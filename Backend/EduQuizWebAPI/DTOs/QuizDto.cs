using EduQuizDBAccess.Entities;

namespace EduQuizWebAPI.DTOs {
    public class QuizDto {
        public int Id { get; set; }
        public int CreatorId { get; set; }
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;
        public DateTime CreationDate { get; set; }
        public ICollection<QuestionDto>? Questions { get; set; }
        public QuizSetting? Settings { get; set; }
        public ICollection<Group>? Groups { get; set; }
    }
}
