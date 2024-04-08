using IoTTracking.Core.Entities.Interfaces;

namespace IoTTracking.Application.RepositoryInterfaces
{
	public interface IRepository<TEntity> where TEntity : class, IEntity
	{
		TEntity? GetById(int id);

		Task<TEntity?> GetByIdAsync(int id);

		IQueryable<TEntity> GetAll();

		TEntity Add(TEntity entity);

		Task<TEntity> AddAsync(TEntity entity);

		TEntity Update(TEntity entity);

		void Delete(TEntity entity);

		TEntity? SetEntityNoTracking(TEntity entity);
	}
}
