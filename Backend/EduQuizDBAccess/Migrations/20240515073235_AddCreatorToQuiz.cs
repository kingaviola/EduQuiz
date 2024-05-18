﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EduQuizDBAccess.Migrations
{
    /// <inheritdoc />
    public partial class AddCreatorToQuiz : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CreatorId",
                table: "Quizzes",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatorId",
                table: "Quizzes");
        }
    }
}
