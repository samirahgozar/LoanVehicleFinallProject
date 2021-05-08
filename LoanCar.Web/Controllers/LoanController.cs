using LoanCar.Data;
using LoanCar.Services;
using Microsoft.AspNetCore.Mvc;

namespace LoanCar.Api.Controllers
{
    [Route("api/loan")]
    public class LoanController : BaseController<Loan>
    {
        public LoanController(ILoanService loanService) : base(loanService)
        {

        }
    }
}
