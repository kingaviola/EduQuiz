using EduQuizDBAccess.Entities;

namespace EduQuizWebAPI.Models {
    public class AnswerModel {
        public int? Id { get; set; }
        public double? Point { get; set; }
        public bool? Correctness { get; set; }
        public string? AnswerText { get; set; }
        public int? Order { get; set; }
        public string? Base { get; set; }
        public string? Pair { get; set; }
        public ICollection<Variable>? Variables { get; set; } 
        public double? Result { get; set; }
    }
}
