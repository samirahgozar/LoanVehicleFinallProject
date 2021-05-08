using LoanCar.Data;
using LoanCar.Data.Dtos;
using System.Linq;

namespace LoanCar.Services
{
    public class ContactService : BaseService<Contact>, IContactService
    {
        public ContactService(CrudApiDbContext crudApiDbContext) : base(crudApiDbContext) { }

        public GridData<Contact> GetAllContactList(AgGridParameter gridParameter)
        {

            GridData<Contact> res = new GridData<Contact>();
            var list = GetAll();

            res.TotalCount = list.Count();
            var filteredResults = list.Skip(gridParameter.StartRow).Take(gridParameter.PageSize)
               .AsEnumerable();

            res.Items = filteredResults.ToList();
            return res;
        }

    }
}
