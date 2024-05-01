using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduQuizDBAccess.Entities {
    public class Image {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public byte[] Data { get; set; } = null!;
        public string Type { get; set; } = null!;
    }
}
