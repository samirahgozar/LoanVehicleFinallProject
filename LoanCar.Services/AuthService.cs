using LoanCar.Data;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace LoanCar.Services
{
    public class AuthService : BaseService<User>, IAuthService
    {
        public AuthService(CrudApiDbContext crudApiDbContext) : base(crudApiDbContext)
        {


        }
        public async Task<User> Register(User user, string password)
        {
            Infsture.CreatePasswordHash(password, out var passwordSalt, out var passwordHash);
            user.PasswordSalt = passwordSalt;
            user.PasswordHash = passwordHash;
            await CreateAsync(user);
            return user;
        }

        public async Task<User> Login(string username, string password)
        {
            var userByUsernane = await ReadAsync(username);

            if (userByUsernane == null)
                return null;
            return !(Infsture.VerifyPasswordHash(password, userByUsernane.PasswordHash, userByUsernane.PasswordSalt)) ? null : userByUsernane;
        }

        public async Task<User> ReadAsync(string username, bool tracking = true)
        {
            var query = _crudApiDbContext.Set<User>().AsQueryable();

            if (!tracking)
            {
                query = query.AsNoTracking();
            }
            return await query.FirstOrDefaultAsync(entity => entity.Username == username);
        }

        public  User GetUserByUsername(string username, bool tracking = true)
        {
            var query = _crudApiDbContext.Set<User>().AsQueryable();

            if (!tracking)
            {
                query = query.AsNoTracking();
            }
            return  query.Where(entity => entity.Username == username).FirstOrDefault();
        }


        public async Task<bool> UserExist(string username, bool tracking = true)
        {
            var query = _crudApiDbContext.Set<User>().AsQueryable();

            if (!tracking)
            {
                query = query.AsNoTracking();
            }

            return await query.FirstOrDefaultAsync(entity => entity.Username == username) != null;

        }
    }
}
