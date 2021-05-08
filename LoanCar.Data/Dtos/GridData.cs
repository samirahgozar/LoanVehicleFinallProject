using System.Collections.Generic;

namespace LoanCar.Data.Dtos
{
    public class GridData<T> where T : class
    {
        public int TotalCount { get; set; }
        public List<T> Items { get; set; }
    }
}
