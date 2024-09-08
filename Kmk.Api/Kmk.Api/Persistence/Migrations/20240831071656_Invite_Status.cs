using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Kmk.Api.Migrations
{
    /// <inheritdoc />
    public partial class Invite_Status : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Invite",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "Invite");
        }
    }
}
