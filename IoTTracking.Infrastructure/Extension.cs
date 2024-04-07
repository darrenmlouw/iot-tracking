using IoTTracking.Application.RepositoryInterfaces;
using IoTTracking.Infrastructure.Repositories;
using IoTTracking.Infrastructure.UnitWork;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace IoTTracking.Infrastructure
{
	public static class Extensions
	{
		public static IServiceCollection AddDbContextService(this IServiceCollection services, IConfiguration configuration)
		{
			var connectionString = configuration.GetConnectionString("DefaultConnection");

			services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(connectionString));

			services.AddDbContext<ApplicationDbContext>();
			return services;
		}

		public static IServiceCollection AddReposityServices(this IServiceCollection services)
		{
			services.AddScoped<IUnitOfWork, UnitOfWork>();
			services.AddScoped<IFirmwareRepository, FirmwareRepository>();
			services.AddScoped<IGroupsRepository, GroupsRepository>();
			services.AddScoped<IDevicesRepository, DevicesRepository>();
			
			return services;
		}
	}
}
