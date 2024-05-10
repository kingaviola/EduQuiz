using static System.Runtime.InteropServices.JavaScript.JSType;

namespace EduQuizWebAPI.Models {
    public class GroupCardModel {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public int MembersNum { get; set; }
        public string Description { get; set; } = null!;
        public int CreatorId { get; set; }
        public string CreatorName { get; set; } = null!;
        public string JoinCode { get; set; } = null!;
    }
}
