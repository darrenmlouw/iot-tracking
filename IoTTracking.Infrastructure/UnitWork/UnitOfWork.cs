using IoTTracking.Application.RepositoryInterfaces;
using Microsoft.EntityFrameworkCore.Storage;

namespace IoTTracking.Infrastructure.UnitWork
{
	public class UnitOfWork(ApplicationDbContext appDbContext) : IUnitOfWork
	{
		private readonly ApplicationDbContext _appDbContext = appDbContext;
		private IDbContextTransaction? _currentTransaction;
		private readonly Dictionary<Type, object> _repositories = [];
		private bool disposedValue;

		public async Task BeginTransactionAsync()
		{
			_currentTransaction = await _appDbContext.Database.BeginTransactionAsync();
		}

		public async Task CommitAsync()
		{
			try
			{
				await _appDbContext.SaveChangesAsync();
				if (_currentTransaction != null)
				{
					await _currentTransaction.CommitAsync();
				}
			}
			catch
			{
				await RollbackAsync();
				throw;
			}
		}

		public async Task RollbackAsync()
		{
			if (_currentTransaction != null)
			{
				await _currentTransaction.RollbackAsync();
				_currentTransaction.Dispose();
			}
		}

		public async Task<int> SaveChangesAsync()
		{
			return await _appDbContext.SaveChangesAsync();
		}

		protected virtual void Dispose(bool disposing)
		{
			if (!disposedValue)
			{
				if (disposing)
				{
					_appDbContext.Dispose();

					_currentTransaction?.Dispose();

					foreach (var repository in _repositories.Values)
					{
						if (repository is IDisposable disposableRepository)
						{
							disposableRepository.Dispose();
						}
					}
				}

				disposedValue = true;
			}
		}

		public void Dispose()
		{
			Dispose(disposing: true);
			GC.SuppressFinalize(this);
		}
	}
}
