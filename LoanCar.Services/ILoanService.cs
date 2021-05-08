using LoanCar.Data;
using LoanCar.Data.Dtos;
using System.Collections.Generic;

namespace LoanCar.Services
{
    public interface ILoanService : IBaseService<Loan>
    {

        IEnumerable<Loan> GetAllList(AgGridParameter gridParameter, out int rowCount);
    }
}
