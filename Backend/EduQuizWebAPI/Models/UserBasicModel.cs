using EduQuizDBAccess.Entities;

namespace EduQuizWebAPI.Models {
    public class UserBasicModel {
        public int Id { get; set; }
        public string UserName { get; set; } = null!;
        public string Name { get; set; } = null!;

    }
}
