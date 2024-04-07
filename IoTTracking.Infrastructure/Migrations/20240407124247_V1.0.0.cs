using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace IoTTracking.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class V100 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Firmwares",
                columns: table => new
                {
                    FirmwareId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Version = table.Column<string>(type: "VARCHAR(255)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Firmwares", x => x.FirmwareId);
                });

            migrationBuilder.CreateTable(
                name: "Groups",
                columns: table => new
                {
                    GroupId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "VARCHAR(255)", nullable: false),
                    ParentGroupId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Groups", x => x.GroupId);
                    table.ForeignKey(
                        name: "FK_Groups_Groups_ParentGroupId",
                        column: x => x.ParentGroupId,
                        principalTable: "Groups",
                        principalColumn: "GroupId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Devices",
                columns: table => new
                {
                    DeviceId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "VARCHAR(255)", nullable: false),
                    FirmwareId = table.Column<int>(type: "int", nullable: false),
                    GroupId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Devices", x => x.DeviceId);
                    table.ForeignKey(
                        name: "FK_Devices_Firmwares_FirmwareId",
                        column: x => x.FirmwareId,
                        principalTable: "Firmwares",
                        principalColumn: "FirmwareId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Devices_Groups_GroupId",
                        column: x => x.GroupId,
                        principalTable: "Groups",
                        principalColumn: "GroupId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "Firmwares",
                columns: new[] { "FirmwareId", "Version" },
                values: new object[,]
                {
                    { 1, "v1.2.5" },
                    { 2, "v1.3.0" },
                    { 3, "v2.0.1" }
                });

            migrationBuilder.InsertData(
                table: "Groups",
                columns: new[] { "GroupId", "Name", "ParentGroupId" },
                values: new object[,]
                {
                    { 1, "North America", null },
                    { 2, "Europe", null },
                    { 3, "Asia", null },
                    { 4, "USA", 1 },
                    { 5, "Canada", 1 },
                    { 6, "Germany", 2 },
                    { 7, "France", 2 },
                    { 8, "China", 3 },
                    { 9, "Japan", 3 }
                });

            migrationBuilder.InsertData(
                table: "Devices",
                columns: new[] { "DeviceId", "FirmwareId", "GroupId", "Name" },
                values: new object[,]
                {
                    { 1, 1, 4, "Thermostat - Office 101" },
                    { 2, 2, 4, "Security Camera - Entrance" },
                    { 3, 1, 5, "Smart Light - Hallway" },
                    { 4, 3, 6, "HVAC System - HQ" },
                    { 5, 2, 7, "Door Lock - Warehouse" },
                    { 6, 1, 8, "Water Sensor - Basement" },
                    { 7, 3, 9, "Air Quality Monitor - Lab" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Devices_FirmwareId",
                table: "Devices",
                column: "FirmwareId");

            migrationBuilder.CreateIndex(
                name: "IX_Devices_GroupId",
                table: "Devices",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_Firmwares_Version",
                table: "Firmwares",
                column: "Version",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Groups_ParentGroupId",
                table: "Groups",
                column: "ParentGroupId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Devices");

            migrationBuilder.DropTable(
                name: "Firmwares");

            migrationBuilder.DropTable(
                name: "Groups");
        }
    }
}
