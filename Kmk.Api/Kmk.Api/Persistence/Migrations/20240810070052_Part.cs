using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Kmk.Api.Migrations
{
    /// <inheritdoc />
    public partial class Part : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Part",
                columns: table => new
                {
                    ArrangementSerialNumber = table.Column<int>(type: "int", nullable: false),
                    Instrument = table.Column<int>(type: "int", nullable: false),
                    Count = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Part", x => new { x.ArrangementSerialNumber, x.Instrument });
                    table.ForeignKey(
                        name: "FK_Part_Arrangement_ArrangementSerialNumber",
                        column: x => x.ArrangementSerialNumber,
                        principalTable: "Arrangement",
                        principalColumn: "SerialNumber",
                        onDelete: ReferentialAction.Cascade);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Part");
        }
    }
}
