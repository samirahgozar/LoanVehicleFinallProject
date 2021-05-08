using LoanCar.Data;
using LoanCar.Services;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics.CodeAnalysis;
using System.Threading.Tasks;

namespace LoanCar.Api.Controllers
{
    [ApiController]

    public abstract class BaseController<TEntity> : Controller where TEntity : class, IBase
    {
        protected readonly IBaseService<TEntity> _service;

        protected BaseController([NotNull] IBaseService<TEntity> service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _service.GetAllAsync());
        }

        [HttpPost]
        public async Task<IActionResult> CreateAsync(TEntity entity)
        {
            entity = await _service.CreateAsync(entity);

            return Ok(entity);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> ReadAsync(int id)
        {
            var entity = await _service.ReadAsync(id);

            if (entity == null)
            {
                return NotFound();
            }

            return Ok(entity);
        }

        [HttpPatch("{id:int}")]
        public async Task<IActionResult> UpdatePartialAsync(int id, [FromBody] JsonPatchDocument<TEntity> patchEntity)
        {
            var entity = await _service.ReadAsync(id, false);

            if (entity == null)
            {
                return NotFound();
            }

            patchEntity.ApplyTo(entity, ModelState);
            entity = await _service.UpdateAsync(id, entity);

            return Ok(entity);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var entity = await _service.ReadAsync(id);

            if (entity == null)
            {
                return NotFound();
            }

            await _service.DeleteAsync(id);

            return Ok(entity);
        }
    }
}
