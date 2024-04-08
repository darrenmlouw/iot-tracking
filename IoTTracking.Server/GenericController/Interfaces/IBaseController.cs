using Microsoft.AspNetCore.Mvc;

namespace IoTTracking.Server.GenericController.Interfaces
{
	public interface IBaseController<TEntity, TDto>
    {
        Task<IActionResult> GetById(int id);
		IActionResult GetAll();
        Task<IActionResult> Add(TDto dto);
        Task<IActionResult> Update(TDto dto);
        Task<IActionResult> Delete(int id);
    }
}
