namespace LoanCar.Data
{

    public class MethodResult<T>
    {
        public MethodResult() { }
        public MethodResult(T result) {
            this.Result = result;
        }
        public string ResultModel { get; set; }
        //public IEnumerable<MethodError> Errors { get; set; }
        public T Result { get; set; }
    }
}
