using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Kmk.Api.Migrations
{
    /// <inheritdoc />
    public partial class ChannelUserFK : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_User_Channel_ChannelId",
                table: "User");

            migrationBuilder.DropIndex(
                name: "IX_User_ChannelId",
                table: "User");

            migrationBuilder.DropColumn(
                name: "ChannelId",
                table: "User");

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
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ChannelUser");

            migrationBuilder.AddColumn<Guid>(
                name: "ChannelId",
                table: "User",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_User_ChannelId",
                table: "User",
                column: "ChannelId");

            migrationBuilder.AddForeignKey(
                name: "FK_User_Channel_ChannelId",
                table: "User",
                column: "ChannelId",
                principalTable: "Channel",
                principalColumn: "Id");
        }
    }
}
