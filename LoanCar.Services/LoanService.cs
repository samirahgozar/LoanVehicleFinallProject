using LoanCar.Data;
using LoanCar.Data.Dtos;
using System.Collections.Generic;
using System.Linq;

namespace LoanCar.Services
{
    public class LoanService : BaseService<Loan>,ILoanService
    {
        public LoanService(CrudApiDbContext crudApiDbContext) : base(crudApiDbContext) { }
      
        public GridData<Loan> GetAllLoanList(AgGridParameter gridParameter)
        {

          GridData<Loan> res = new GridData<Loan>();
            var list = GetAll();

            res.TotalCount = list.Count();
            var filteredResults = list.Skip(gridParameter.StartRow).Take(gridParameter.PageSize)
               .AsEnumerable();

            res.Items = filteredResults.ToList();
            return res;
        }

        public IEnumerable<Loan> GetAllList(AgGridParameter gridParameter, out int rowCount)
        {

            var list = GetAll();
         
            rowCount = list.Count();   
            var filteredResults = list.Skip(gridParameter.StartRow).Take(gridParameter.PageSize)
               .AsEnumerable();

            return filteredResults;
        }
    }
}
