using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Kmk.Api.Migrations
{
    /// <inheritdoc />
    public partial class Add_Arrangement : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Arrangements",
                columns: table => new
                {
                    SerialNumber = table.Column<int>(type: "int", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Composer = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Arranger = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Arrangements", x => x.SerialNumber);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Arrangements");
        }
    }
}
