using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduQuizDBAccess.Entities {
    public class User {
        public int Id { get; set; }
        public string UserName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Name { get; set; } = null!;
        public string Password { get; set; } = null!;
        public Image? Image { get; set; }
        public string Theme { get; set; } = null!; 
        public string Status { get; set; } = null!;
        public ICollection<Quiz>? Quizzes { get; set; }

        public ICollection<Group>? Groups { get; set;}

    }
}
