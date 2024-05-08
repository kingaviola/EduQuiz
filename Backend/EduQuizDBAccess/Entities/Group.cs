using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduQuizDBAccess.Entities {
    public class Group {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;
        public ICollection<User>? Members { get; set; }
        public int CreatorId { get; set; }
        public string CreatorName { get; set; } = null!;
        public string JoinCode { get; set; } = null!;
        public ICollection<Quiz>? SharedQuizzes { get; set; }
    }
}
