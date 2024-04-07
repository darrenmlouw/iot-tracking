using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace IoTTracking.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class V101 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Firmwares",
                columns: new[] { "Id", "Version" },
                values: new object[,]
                {
                    { 1, "v1.2.5" },
                    { 2, "v1.3.0" },
                    { 3, "v2.0.1" }
                });

            migrationBuilder.InsertData(
                table: "Groups",
                columns: new[] { "Id", "Name", "ParentGroupId" },
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
                columns: new[] { "Id", "FirmwareId", "GroupId", "Name" },
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
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Devices",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Devices",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Devices",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Devices",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Devices",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Devices",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Devices",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Firmwares",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Firmwares",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Firmwares",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Groups",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Groups",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Groups",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Groups",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Groups",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Groups",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Groups",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Groups",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Groups",
                keyColumn: "Id",
                keyValue: 3);
        }
    }
}
