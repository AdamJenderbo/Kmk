using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Kmk.Infrastructure.Database.Migrations
{
    /// <inheritdoc />
    public partial class ArrangementPart : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ArrangementPart",
                columns: table => new
                {
                    ArrangementSerialNumber = table.Column<int>(type: "int", nullable: false),
                    Instrument = table.Column<int>(type: "int", nullable: false),
                    FileId = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ArrangementPart", x => new { x.ArrangementSerialNumber, x.Instrument });
                    table.ForeignKey(
                        name: "FK_ArrangementPart_Arrangement_ArrangementSerialNumber",
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
                name: "ArrangementPart");
        }
    }
}
