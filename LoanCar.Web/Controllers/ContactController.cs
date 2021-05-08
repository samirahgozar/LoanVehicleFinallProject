using LoanCar.Data;
using LoanCar.Services;
using Microsoft.AspNetCore.Mvc;

namespace LoanCar.Api.Controllers
{
    [Route("api/contact")]
    public class ContactController : BaseController<Contact>
    {
        public ContactController(IContactService contactService) : base(contactService)
        {

        }
    }
}
