﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduQuizDBAccess.Entities {
    public class RightOrderAnswer : AnswerOption {
        public int Order {  get; set; }
        public string Text { get; set; } = null!;
    }
}
