using EduQuizDBAccess.Entities;

namespace EduQuizWebAPI.Models {
    public class QuizCard {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;
        public DateTime CreationDate { get; set; }
        public string Deadline { get; set; }
    }
}
