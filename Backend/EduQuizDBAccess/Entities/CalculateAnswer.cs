using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduQuizDBAccess.Entities {
    public class CalculateAnswer : AnswerOption {
        public ICollection<Variable> Variables { get; set; } = null!;
        public double Result { get; set; }
    }
}
