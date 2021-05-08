using LoanCar.Data;
using System.Threading.Tasks;

namespace LoanCar.Services
{
    public interface IAuthService : IBaseService<User>
    {
        Task<bool> UserExist(string username, bool tracking = true);
        Task<User> ReadAsync(string username, bool tracking = true);
        User GetUserByUsername(string username, bool tracking = true);
        Task<User> Register(User user, string password);
        Task<User> Login(string username, string password);
    }
}
