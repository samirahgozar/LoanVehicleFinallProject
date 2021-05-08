using Microsoft.EntityFrameworkCore.Migrations;

namespace LoanCar.Data.Migrations
{
    public partial class changeLoanModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "PresentEmployerMonthlyIncome",
                schema: "fac",
                table: "Loan",
                maxLength: 70,
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AlterColumn<string>(
                name: "ApplicantEmployerMonthlyIncome",
                schema: "fac",
                table: "Loan",
                maxLength: 70,
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<long>(
                name: "PresentEmployerMonthlyIncome",
                schema: "fac",
                table: "Loan",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 70,
                oldNullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "ApplicantEmployerMonthlyIncome",
                schema: "fac",
                table: "Loan",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 70,
                oldNullable: true);
        }
    }
}
