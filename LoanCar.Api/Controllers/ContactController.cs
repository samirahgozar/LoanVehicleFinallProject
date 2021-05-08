using LoanCar.Data;
using LoanCar.Data.Dtos;
using LoanCar.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LoanCar.Api.Controllers
{
    [Route("api/contact")]
    public class ContactController : BaseController<Contact>
    {
        private readonly CrudApiDbContext _crudApiDbContext;

        public ContactController(IContactService contactService, CrudApiDbContext crudApiDbContext) : base(contactService)
        {
            _crudApiDbContext = crudApiDbContext;

        }

        [HttpPost("GetAllContactList")]
        [Authorize]
        public MethodResult<GridData<Contact>> GetAllContactList([FromBody]AgGridParameter gridParameter)
        {
            MethodResult<GridData<Contact>> res = new MethodResult<GridData<Contact>>();
            ContactService currencyBO = new ContactService(_crudApiDbContext);
            res.Result = currencyBO.GetAllContactList(gridParameter);
            return res;
        }
    }
}
