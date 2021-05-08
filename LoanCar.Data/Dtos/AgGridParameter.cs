using System.Collections.Generic;

namespace LoanCar.Data.Dtos
{
    public class AgGridParameter
    {
        public int StartRow { get; set; }
        public int EndRow { get; set; }
        public int PageSize { get; set; }
        public string ColId { get; set; }
        public string Sort { get; set; }
        //public string SearchTerm { get; set; }

        //public List<FilterParameter> Filters { get; set; }
    }
}
