using LoanCar.Data;
using LoanCar.Data.Dtos;
using LoanCar.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LoanCar.Api.Controllers
{
    [Route("api/loan")]
    public class LoanController : BaseController<Loan>
    {
        private readonly CrudApiDbContext _crudApiDbContext;

        public LoanController(ILoanService loanService, CrudApiDbContext crudApiDbContext) : base(loanService)
        {
            _crudApiDbContext = crudApiDbContext;
        }

        [HttpPost("GetAllLoanList")]
        [Authorize]
        public MethodResult<GridData<Loan>> GetAllLoanList([FromBody]AgGridParameter gridParameter)
        {
            MethodResult<GridData<Loan>> res = new MethodResult<GridData<Loan>>();
            LoanService currencyBO = new LoanService(_crudApiDbContext);
            res.Result = currencyBO.GetAllLoanList(gridParameter);
            return res;
        }

    }
    
}
