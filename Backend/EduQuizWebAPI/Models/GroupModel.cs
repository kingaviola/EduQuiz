using EduQuizDBAccess.Entities;

namespace EduQuizWebAPI.Models {
    public class GroupModel {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;
        public ICollection<int>? MemberIds { get; set; }
        public int CreatorId { get; set; }
        public string CreatorName { get; set; } = null!;
        public string JoinCode { get; set; } = null!;
        public ICollection<int>? SharedQuizIds { get; set; }
    }
}
