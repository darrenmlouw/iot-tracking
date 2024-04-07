using IoTTracking.Application.Services.GenericService.Interfaces;
using IoTTracking.Server.GenericController.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace IoTTracking.Server.GenericController
{
	[ApiController]
    [Route("api/[controller]")]
    public abstract class BaseController<TEntity, TDto> : ControllerBase, IBaseController<TEntity, TDto>
        where TDto : class
        where TEntity : class
    {
        protected readonly IService<TEntity, TDto> _logic;

        public BaseController(IService<TEntity, TDto> logic)
        {
            _logic = logic;
        }

        /// <summary>
        /// Gets the {Entity} by ID.
        /// </summary>
        /// <param name="id">The ID of the {Entity}.</param>
        /// <returns>The {Entity} with the specified ID.</returns>
        [HttpGet("Get/{id}")]
        public virtual async Task<IActionResult> GetById(int id)
        {
            var entity = await _logic.GetById(id);
            return entity == null ? NotFound() : Ok(entity);
        }

        /// <summary>
        /// Gets all {Entities}
        /// </summary>
        /// <returns>A collection of {Entities}.</returns>
        [HttpGet("GetAll")]
        public virtual async Task<IActionResult> GetAll()
        {
            var data = await _logic.GetAll();
            return Ok(data);
        }

        /// <summary>
        /// Adds a new {Entity}.
        /// </summary>
        /// <param name="dto">The DTO representing the {Entity} to be added.</param>
        /// <returns>The newly created {Entity}.</returns>
        /// 
        [HttpPost("Add")]
        public virtual async Task<IActionResult> Add(TDto dto)
        {
            var added = await _logic.Add(dto);
            return CreatedAtAction(nameof(GetById), new { id = _logic.GetEntityId(added) }, added);
        }

        /// <summary>
        /// Updates an existing {Entity} based on the provided DTO.
        /// </summary>
        /// <param name="dto">The DTO representing the updated {Entity}.</param>
        /// <returns>The updated {Entity}.</returns>
        [HttpPut("Update")]
        public virtual async Task<IActionResult> Update(TDto dto)
        {
            var updated = await _logic.Update(dto);
            return AcceptedAtAction(nameof(GetById), new { id = _logic.GetEntityId(updated) }, updated);
        }

        /// <summary>
        /// Deletes a {Entity} by its ID.
        /// </summary>
        /// <param name="id">The ID of the {Entity} to delete.</param>
        /// <returns>No content if the delete operation is successful.</returns>
        [HttpDelete("Delete/{id}")]
        public virtual async Task<IActionResult> Delete(int id)
        {
            await _logic.Delete(id);
            return NoContent();
        }
    }
}
