namespace IoTTracking.Application.Services.GenericService.Interfaces
{
	public interface IService<TEntity, TDto> where TDto : class where TEntity : class
	{
		Task<TDto> GetById(int id);
		Task<List<TDto>> GetAll();
		Task<TDto> Add(TDto dto);
		Task<TDto> Update(TDto dto);
		Task Delete(int id);
		int? GetEntityId(TDto dto);
	}
}
