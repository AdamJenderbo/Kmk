using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Kmk.Api.Migrations
{
    /// <inheritdoc />
    public partial class ChannelRemoveFK : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Post_Channel_ChannelId",
                table: "Post");

            migrationBuilder.DropTable(
                name: "ChannelUser");

            migrationBuilder.AddColumn<Guid>(
                name: "ChannelId",
                table: "User",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "ChannelId",
                table: "Post",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_User_ChannelId",
                table: "User",
                column: "ChannelId");

            migrationBuilder.AddForeignKey(
                name: "FK_Post_Channel_ChannelId",
                table: "Post",
                column: "ChannelId",
                principalTable: "Channel",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_User_Channel_ChannelId",
                table: "User",
                column: "ChannelId",
                principalTable: "Channel",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Post_Channel_ChannelId",
                table: "Post");

            migrationBuilder.DropForeignKey(
                name: "FK_User_Channel_ChannelId",
                table: "User");

            migrationBuilder.DropIndex(
                name: "IX_User_ChannelId",
                table: "User");

            migrationBuilder.DropColumn(
                name: "ChannelId",
                table: "User");

            migrationBuilder.AlterColumn<Guid>(
                name: "ChannelId",
                table: "Post",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.CreateTable(
                name: "ChannelUser",
                columns: table => new
                {
                    ChannelId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    MembersId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChannelUser", x => new { x.ChannelId, x.MembersId });
                    table.ForeignKey(
                        name: "FK_ChannelUser_Channel_ChannelId",
                        column: x => x.ChannelId,
                        principalTable: "Channel",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ChannelUser_User_MembersId",
                        column: x => x.MembersId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ChannelUser_MembersId",
                table: "ChannelUser",
                column: "MembersId");

            migrationBuilder.AddForeignKey(
                name: "FK_Post_Channel_ChannelId",
                table: "Post",
                column: "ChannelId",
                principalTable: "Channel",
                principalColumn: "Id");
        }
    }
}
