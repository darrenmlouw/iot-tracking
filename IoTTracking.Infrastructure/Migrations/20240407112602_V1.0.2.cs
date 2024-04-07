using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IoTTracking.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class V102 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Groups",
                newName: "GroupId");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Firmwares",
                newName: "FirmwareId");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Devices",
                newName: "DeviceId");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Groups",
                type: "VARCHAR(255)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Version",
                table: "Firmwares",
                type: "VARCHAR(255)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Devices",
                type: "VARCHAR(255)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateIndex(
                name: "IX_Firmwares_Version",
                table: "Firmwares",
                column: "Version",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Firmwares_Version",
                table: "Firmwares");

            migrationBuilder.RenameColumn(
                name: "GroupId",
                table: "Groups",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "FirmwareId",
                table: "Firmwares",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "DeviceId",
                table: "Devices",
                newName: "Id");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Groups",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "VARCHAR(255)");

            migrationBuilder.AlterColumn<string>(
                name: "Version",
                table: "Firmwares",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "VARCHAR(255)");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Devices",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "VARCHAR(255)");
        }
    }
}
