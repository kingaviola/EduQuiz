using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduQuizDBAccess.Entities {
    public class PairingAnswer : AnswerOption{
        public string Base { get; set; } = null!;
        public string Pair { get; set; } = null!;
    }
}
