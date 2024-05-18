using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EduQuizDBAccess.Migrations
{
    /// <inheritdoc />
    public partial class AddFilledQuiz : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "QuestionGroups",
                table: "QuizSettings",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "FilledQuizId",
                table: "Questions",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "FilledQuizzes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    QuizId = table.Column<int>(type: "int", nullable: false),
                    QuizCreatorId = table.Column<int>(type: "int", nullable: false),
                    IsChecked = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FilledQuizzes", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Questions_FilledQuizId",
                table: "Questions",
                column: "FilledQuizId");

            migrationBuilder.AddForeignKey(
                name: "FK_Questions_FilledQuizzes_FilledQuizId",
                table: "Questions",
                column: "FilledQuizId",
                principalTable: "FilledQuizzes",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Questions_FilledQuizzes_FilledQuizId",
                table: "Questions");

            migrationBuilder.DropTable(
                name: "FilledQuizzes");

            migrationBuilder.DropIndex(
                name: "IX_Questions_FilledQuizId",
                table: "Questions");

            migrationBuilder.DropColumn(
                name: "QuestionGroups",
                table: "QuizSettings");

            migrationBuilder.DropColumn(
                name: "FilledQuizId",
                table: "Questions");
        }
    }
}
