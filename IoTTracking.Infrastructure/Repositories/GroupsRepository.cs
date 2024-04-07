using IoTTracking.Application.RepositoryInterfaces;
using IoTTracking.Core.Entities;
using IoTTracking.Infrastructure.GenericRepository;
using System.Linq.Expressions;

namespace IoTTracking.Infrastructure.Repositories
{
	public class GroupsRepository : Repository<Groups>, IGroupsRepository
	{
		private static readonly Expression<Func<Groups, object>>[] includes = {

		};

		public GroupsRepository(ApplicationDbContext dbContext) : base(dbContext, includes)
		{
			
		}
	}
}
