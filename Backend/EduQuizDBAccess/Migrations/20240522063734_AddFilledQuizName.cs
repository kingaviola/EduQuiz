using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EduQuizDBAccess.Migrations
{
    /// <inheritdoc />
    public partial class AddFilledQuizName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "QuizName",
                table: "FilledQuizzes",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "QuizName",
                table: "FilledQuizzes");
        }
    }
}
