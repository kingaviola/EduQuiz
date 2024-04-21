using EduQuizDBAccess.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduQuizDBAccess.Data {
    public class EduQuizContext : DbContext {
        public DbSet<Quiz> Quizzes { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //TODO: secure connection string
            optionsBuilder.UseSqlServer("Data Source=localhost\\sqlexpress;Initial Catalog=EduQuiz;Integrated Security=True;Trust Server Certificate=True");
        }
    }
}
