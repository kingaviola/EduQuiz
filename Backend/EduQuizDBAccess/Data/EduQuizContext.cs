using EduQuizDBAccess.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduQuizDBAccess.Data {
    public class EduQuizContext : DbContext {

        public EduQuizContext(DbContextOptions<EduQuizContext> options) : base(options) { }

        public DbSet<Quiz> Quizzes { get; set; } = null!;
        public DbSet<AnswerOption> Answers { get; set; } = null!;
        public DbSet<CalculateAnswer> CalculateAnswers { get; set; } = null!;
        public DbSet<FreeTextAnswer> FreeTextAnswers { get; set; } = null!;
        public DbSet<Image> Images { get; set; } = null!;
        public DbSet<PairingAnswer> PairingAnswers { get; set; } = null!;
        public DbSet<Question> Questions { get; set; } = null!;
        public DbSet<QuizSetting> QuizSettings { get; set; } = null!;
        public DbSet<RightOrderAnswer> RightOrderAnswers { get; set; } = null!;
        public DbSet<SimpleAnswer> SimpleAnswers { get; set; } = null!;
        public DbSet<Variable> Variables { get; set; } = null!;


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //TODO: secure connection string
            optionsBuilder.UseSqlServer("Data Source=localhost\\sqlexpress;Initial Catalog=EduQuiz;Integrated Security=True;Trust Server Certificate=True");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //modelBuilder.Entity<AnswerOption>().HasKey(a => a.Id);
            //modelBuilder.Entity<CalculateAnswer>().HasBaseType<AnswerOption>();
        }
    }
}
