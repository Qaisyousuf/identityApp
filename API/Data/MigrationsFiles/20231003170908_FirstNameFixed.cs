using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.MigrationsFiles
{
    /// <inheritdoc />
    public partial class FirstNameFixed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "FistName",
                table: "AspNetUsers",
                newName: "FirstName");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "FirstName",
                table: "AspNetUsers",
                newName: "FistName");
        }
    }
}
