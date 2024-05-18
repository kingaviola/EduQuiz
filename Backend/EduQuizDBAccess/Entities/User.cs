using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduQuizDBAccess.Entities {
    public class User : IdentityUser<int> {
        public string Name { get; set; } = null!;
        public Image? Image { get; set; }
        public ICollection<Quiz>? Quizzes { get; set; }
        public ICollection<Group>? Groups { get; set;}
    }
}
