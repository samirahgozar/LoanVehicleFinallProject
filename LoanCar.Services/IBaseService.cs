using LoanCar.Data;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LoanCar.Services
{
    public interface IBaseService<TEntity> where TEntity : class,IBase
    {
        Task<IEnumerable<TEntity>> GetAllAsync();
        IQueryable<TEntity> GetAll();

        Task<TEntity> CreateAsync(TEntity entity);
        Task<TEntity> ReadAsync(int id, bool tracking = true);
        Task<TEntity> UpdateAsync(int id, TEntity updateEntity);
        Task DeleteAsync(int id);
    }
}
