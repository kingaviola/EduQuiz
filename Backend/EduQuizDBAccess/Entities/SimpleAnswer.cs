using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduQuizDBAccess.Entities {
    public class SimpleAnswer : AnswerOption {
        public bool Correctness { get; set; }
        public string Text { get; set; } = null!;

        public static explicit operator SimpleAnswer(Question v)
        {
            throw new NotImplementedException();
        }
    }
}
