﻿using EduQuizDBAccess.Entities;

namespace EduQuizWebAPI.Models {
    public class RegisterModel {
        public string Name { get; set; } = null!;
        public string UserName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
    }
}
