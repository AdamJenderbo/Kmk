using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Kmk.Api.Migrations
{
    /// <inheritdoc />
    public partial class Correct_Name_Of_Arrangement : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Arrangements",
                table: "Arrangements");

            migrationBuilder.RenameTable(
                name: "Arrangements",
                newName: "Arrangement");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Arrangement",
                table: "Arrangement",
                column: "SerialNumber");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Arrangement",
                table: "Arrangement");

            migrationBuilder.RenameTable(
                name: "Arrangement",
                newName: "Arrangements");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Arrangements",
                table: "Arrangements",
                column: "SerialNumber");
        }
    }
}
