using IoTTracking.Application.RepositoryInterfaces;
using IoTTracking.Core.Entities.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace IoTTracking.Infrastructure.GenericRepository
{
	public abstract class Repository<TEntity> : IRepository<TEntity> where TEntity : class, IEntity
	{
		protected readonly ApplicationDbContext _appDbContext;
		private readonly Expression<Func<TEntity, object>>[] _includes;

		public Repository(ApplicationDbContext appDbContext, params Expression<Func<TEntity, object>>[] includes)
		{
			_appDbContext = appDbContext;
			_includes = includes;
		}

		public IQueryable<TEntity> GetQueryWithIncludesAsTracking(params Expression<Func<TEntity, object>>[] includes)
		{
			IQueryable<TEntity> query = _appDbContext.Set<TEntity>();

			foreach (var include in includes)
			{
				query = query.Include(include);
			}

			return query;
		}

		public IQueryable<TEntity> GetQueryWithIncludesAsNoTracking(params Expression<Func<TEntity, object>>[] includes)
		{
			IQueryable<TEntity> query = _appDbContext.Set<TEntity>().AsNoTracking();

			foreach (var include in includes)
			{
				query = query.Include(include);
			}

			return query;
		}

		public virtual TEntity? GetById(int id)
		{
			IQueryable<TEntity> query = GetQueryWithIncludesAsNoTracking(_includes);

			return query.SingleOrDefault(entity => entity.Id == id);
		}

		public virtual async Task<TEntity?> GetByIdAsync(int id)
		{
			IQueryable<TEntity> query = GetQueryWithIncludesAsNoTracking(_includes);

			return await query.SingleOrDefaultAsync(entity => entity.Id == id);
		}

		public virtual IQueryable<TEntity> GetAll()
		{
			IQueryable<TEntity> query = GetQueryWithIncludesAsNoTracking(_includes);
			return query;
		}

		public virtual TEntity Add(TEntity entity)
		{
			if (entity == null) throw new ArgumentNullException(nameof(entity));
			_appDbContext.Set<TEntity>().Add(entity);
			return entity;
		}

		public virtual async Task<TEntity> AddAsync(TEntity entity)
		{
			if (entity == null) throw new ArgumentNullException(nameof(entity));
			await _appDbContext.Set<TEntity>().AddAsync(entity);
			return entity;
		}

		public virtual void Delete(TEntity entity)
		{
			_appDbContext.Set<TEntity>().Remove(entity);
		}

		public virtual TEntity Update(TEntity entity)
		{
			if (entity == null) throw new ArgumentNullException(nameof(entity));
			_appDbContext.Set<TEntity>().Update(entity);
			return entity;
		}

		public virtual TEntity SetEntityNoTracking(TEntity entity)
		{
			return _appDbContext.Set<TEntity>().AsNoTracking().FirstOrDefault(e => e.Id == entity.Id);
		}
	}
}
