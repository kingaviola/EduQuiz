﻿// <auto-generated />
using System;
using EduQuizDBAccess.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace EduQuizDBAccess.Migrations
{
    [DbContext(typeof(EduQuizContext))]
    [Migration("20240508134319_UpdateUser")]
    partial class UpdateUser
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("EduQuizDBAccess.Entities.AnswerOption", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("AnswerType")
                        .IsRequired()
                        .HasMaxLength(21)
                        .HasColumnType("nvarchar(21)");

                    b.Property<double>("Point")
                        .HasColumnType("float");

                    b.Property<int?>("QuestionId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("QuestionId");

                    b.ToTable("Answers");

                    b.HasDiscriminator<string>("AnswerType").HasValue("AnswerOption");

                    b.UseTphMappingStrategy();
                });

            modelBuilder.Entity("EduQuizDBAccess.Entities.Group", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("CreatorId")
                        .HasColumnType("int");

                    b.Property<string>("CreatorName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("JoinCode")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Groups");
                });

            modelBuilder.Entity("EduQuizDBAccess.Entities.Image", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<byte[]>("Data")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Images");
                });

            modelBuilder.Entity("EduQuizDBAccess.Entities.Question", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("ImageId")
                        .HasColumnType("int");

                    b.Property<string>("QuestionText")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("QuizId")
                        .HasColumnType("int");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("ImageId");

                    b.HasIndex("QuizId");

                    b.ToTable("Questions");
                });

            modelBuilder.Entity("EduQuizDBAccess.Entities.Quiz", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreationDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("GroupId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("SettingsId")
                        .HasColumnType("int");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("GroupId");

                    b.HasIndex("SettingsId");

                    b.HasIndex("UserId");

                    b.ToTable("Quizzes");
                });

            modelBuilder.Entity("EduQuizDBAccess.Entities.QuizSetting", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("DeadlineDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("DeadlineTime")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Duration")
                        .HasColumnType("int");

                    b.Property<bool>("IsAnswerRandom")
                        .HasColumnType("bit");

                    b.Property<bool>("IsDeadline")
                        .HasColumnType("bit");

                    b.Property<bool>("IsDuration")
                        .HasColumnType("bit");

                    b.Property<bool>("IsQuestionRandom")
                        .HasColumnType("bit");

                    b.Property<bool>("IsStart")
                        .HasColumnType("bit");

                    b.Property<bool>("ShowAnswers")
                        .HasColumnType("bit");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("StartTime")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("UseAllQuestion")
                        .HasColumnType("bit");

                    b.Property<int>("UsedQuestions")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("QuizSettings");
                });

            modelBuilder.Entity("EduQuizDBAccess.Entities.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("ImageId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Theme")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("ImageId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("EduQuizDBAccess.Entities.Variable", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("CalculateAnswerId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("Value")
                        .HasColumnType("float");

                    b.HasKey("Id");

                    b.HasIndex("CalculateAnswerId");

                    b.ToTable("Variables");
                });

            modelBuilder.Entity("GroupUser", b =>
                {
                    b.Property<int>("GroupsId")
                        .HasColumnType("int");

                    b.Property<int>("MembersId")
                        .HasColumnType("int");

                    b.HasKey("GroupsId", "MembersId");

                    b.HasIndex("MembersId");

                    b.ToTable("GroupUser");
                });

            modelBuilder.Entity("EduQuizDBAccess.Entities.CalculateAnswer", b =>
                {
                    b.HasBaseType("EduQuizDBAccess.Entities.AnswerOption");

                    b.Property<double>("Result")
                        .HasColumnType("float");

                    b.HasDiscriminator().HasValue("CalculateAnswer");
                });

            modelBuilder.Entity("EduQuizDBAccess.Entities.FreeTextAnswer", b =>
                {
                    b.HasBaseType("EduQuizDBAccess.Entities.AnswerOption");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasDiscriminator().HasValue("FreeTextAnswer");
                });

            modelBuilder.Entity("EduQuizDBAccess.Entities.PairingAnswer", b =>
                {
                    b.HasBaseType("EduQuizDBAccess.Entities.AnswerOption");

                    b.Property<string>("Base")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Pair")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasDiscriminator().HasValue("PairingAnswer");
                });

            modelBuilder.Entity("EduQuizDBAccess.Entities.RightOrderAnswer", b =>
                {
                    b.HasBaseType("EduQuizDBAccess.Entities.AnswerOption");

                    b.Property<int>("Order")
                        .HasColumnType("int");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.ToTable("Answers", t =>
                        {
                            t.Property("Text")
                                .HasColumnName("RightOrderAnswer_Text");
                        });

                    b.HasDiscriminator().HasValue("RightOrderAnswer");
                });

            modelBuilder.Entity("EduQuizDBAccess.Entities.SimpleAnswer", b =>
                {
                    b.HasBaseType("EduQuizDBAccess.Entities.AnswerOption");

                    b.Property<bool>("Correctness")
                        .HasColumnType("bit");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.ToTable("Answers", t =>
                        {
                            t.Property("Text")
                                .HasColumnName("SimpleAnswer_Text");
                        });

                    b.HasDiscriminator().HasValue("SimpleAnswer");
                });

            modelBuilder.Entity("EduQuizDBAccess.Entities.AnswerOption", b =>
                {
                    b.HasOne("EduQuizDBAccess.Entities.Question", null)
                        .WithMany("Answers")
                        .HasForeignKey("QuestionId");
                });

            modelBuilder.Entity("EduQuizDBAccess.Entities.Question", b =>
                {
                    b.HasOne("EduQuizDBAccess.Entities.Image", "Image")
                        .WithMany()
                        .HasForeignKey("ImageId");

                    b.HasOne("EduQuizDBAccess.Entities.Quiz", null)
                        .WithMany("Questions")
                        .HasForeignKey("QuizId");

                    b.Navigation("Image");
                });

            modelBuilder.Entity("EduQuizDBAccess.Entities.Quiz", b =>
                {
                    b.HasOne("EduQuizDBAccess.Entities.Group", null)
                        .WithMany("SharedQuizzes")
                        .HasForeignKey("GroupId");

                    b.HasOne("EduQuizDBAccess.Entities.QuizSetting", "Settings")
                        .WithMany()
                        .HasForeignKey("SettingsId");

                    b.HasOne("EduQuizDBAccess.Entities.User", null)
                        .WithMany("Quizzes")
                        .HasForeignKey("UserId");

                    b.Navigation("Settings");
                });

            modelBuilder.Entity("EduQuizDBAccess.Entities.User", b =>
                {
                    b.HasOne("EduQuizDBAccess.Entities.Image", "Image")
                        .WithMany()
                        .HasForeignKey("ImageId");

                    b.Navigation("Image");
                });

            modelBuilder.Entity("EduQuizDBAccess.Entities.Variable", b =>
                {
                    b.HasOne("EduQuizDBAccess.Entities.CalculateAnswer", null)
                        .WithMany("Variables")
                        .HasForeignKey("CalculateAnswerId");
                });

            modelBuilder.Entity("GroupUser", b =>
                {
                    b.HasOne("EduQuizDBAccess.Entities.Group", null)
                        .WithMany()
                        .HasForeignKey("GroupsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("EduQuizDBAccess.Entities.User", null)
                        .WithMany()
                        .HasForeignKey("MembersId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("EduQuizDBAccess.Entities.Group", b =>
                {
                    b.Navigation("SharedQuizzes");
                });

            modelBuilder.Entity("EduQuizDBAccess.Entities.Question", b =>
                {
                    b.Navigation("Answers");
                });

            modelBuilder.Entity("EduQuizDBAccess.Entities.Quiz", b =>
                {
                    b.Navigation("Questions");
                });

            modelBuilder.Entity("EduQuizDBAccess.Entities.User", b =>
                {
                    b.Navigation("Quizzes");
                });

            modelBuilder.Entity("EduQuizDBAccess.Entities.CalculateAnswer", b =>
                {
                    b.Navigation("Variables");
                });
#pragma warning restore 612, 618
        }
    }
}
