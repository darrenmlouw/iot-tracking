using IoTTracking.Application.RepositoryInterfaces;
using IoTTracking.Core.Entities;
using IoTTracking.Infrastructure.GenericRepository;
using System.Linq.Expressions;

namespace IoTTracking.Infrastructure.Repositories
{
	public class FirmwareRepository : Repository<Firmware>, IFirmwareRepository
	{
		private static readonly Expression<Func<Firmware, object>>[] includes =
		{
		};

		public FirmwareRepository(ApplicationDbContext dbContext) : base(dbContext, includes)
		{
			
		}
	}
}
