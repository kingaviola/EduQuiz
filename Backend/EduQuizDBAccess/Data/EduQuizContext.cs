using EduQuizDBAccess.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace EduQuizDBAccess.Data {
    public class EduQuizContext : IdentityDbContext<User, IdentityRole<int>, int>{

        public EduQuizContext(DbContextOptions<EduQuizContext> options) : base(options) { }

        public DbSet<Quiz> Quizzes { get; set; } = null!;
        public DbSet<AnswerOption> Answers { get; set; } = null!;
        public DbSet<Image> Images { get; set; } = null!;
        public DbSet<Question> Questions { get; set; } = null!;
        public DbSet<QuizSetting> QuizSettings { get; set; } = null!;
        public DbSet<Variable> Variables { get; set; } = null!;
        public DbSet<Group> Groups { get; set; } = null!;
        public DbSet<FilledQuiz> FilledQuizzes { get; set; } = null!;


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<AnswerOption>()
                .HasDiscriminator<string>("AnswerType")
                .HasValue<SimpleAnswer>("SimpleAnswer")
                .HasValue<RightOrderAnswer>("RightOrderAnswer")
                .HasValue<PairingAnswer>("PairingAnswer")
                .HasValue<FreeTextAnswer>("FreeTextAnswer")
                .HasValue<CalculateAnswer>("CalculateAnswer");

        }
    }
}
