using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EduQuizDBAccess.Migrations
{
    /// <inheritdoc />
    public partial class UpdateQuiz : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Quizzes_Groups_GroupId",
                table: "Quizzes");

            migrationBuilder.DropIndex(
                name: "IX_Quizzes_GroupId",
                table: "Quizzes");

            migrationBuilder.DropColumn(
                name: "GroupId",
                table: "Quizzes");

            migrationBuilder.CreateTable(
                name: "GroupQuiz",
                columns: table => new
                {
                    GroupsId = table.Column<int>(type: "int", nullable: false),
                    SharedQuizzesId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GroupQuiz", x => new { x.GroupsId, x.SharedQuizzesId });
                    table.ForeignKey(
                        name: "FK_GroupQuiz_Groups_GroupsId",
                        column: x => x.GroupsId,
                        principalTable: "Groups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GroupQuiz_Quizzes_SharedQuizzesId",
                        column: x => x.SharedQuizzesId,
                        principalTable: "Quizzes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_GroupQuiz_SharedQuizzesId",
                table: "GroupQuiz",
                column: "SharedQuizzesId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GroupQuiz");

            migrationBuilder.AddColumn<int>(
                name: "GroupId",
                table: "Quizzes",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Quizzes_GroupId",
                table: "Quizzes",
                column: "GroupId");

            migrationBuilder.AddForeignKey(
                name: "FK_Quizzes_Groups_GroupId",
                table: "Quizzes",
                column: "GroupId",
                principalTable: "Groups",
                principalColumn: "Id");
        }
    }
}
