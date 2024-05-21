
using EduQuizDBAccess.Entities;

namespace EduQuizWebAPI.Models {
    public class UserProfileModel {
        public string? Name { get; set; }
        public string? UserName { get; set; }
        public string? Email { get; set; }
        public Image? UserImage { get; set; }
    }
}
