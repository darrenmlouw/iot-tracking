using IoTTracking.Application.RepositoryInterfaces;
using IoTTracking.Core.Entities;
using IoTTracking.Infrastructure.GenericRepository;
using System.Linq.Expressions;

namespace IoTTracking.Infrastructure.Repositories
{
	public class DevicesRepository : Repository<Devices>, IDevicesRepository
	{
		private static readonly Expression<Func<Devices, object>>[] includes =
		{
		};

		public DevicesRepository(ApplicationDbContext dbContext) : base(dbContext, includes)
		{
			
		}
	}
}
