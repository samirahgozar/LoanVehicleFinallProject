
using LoanCar.Data;

namespace LoanCar.Services
{
    public class UserService : BaseService<User>,IUserService
    {
        public UserService(CrudApiDbContext crudApiDbContext) : base(crudApiDbContext) { }
    }
}
