using EduQuizDBAccess.Entities;

namespace EduQuizWebAPI.Models {
    public class RegisterModel {
        public string Email { get; set; } = null!;
        public string Name { get; set; } = null!;
        public string Password { get; set; } = null!;

    }
}
