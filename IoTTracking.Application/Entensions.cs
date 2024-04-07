using IoTTracking.Application.DTOs;
using IoTTracking.Application.Services;
using IoTTracking.Application.Services.GenericService.Interfaces;
using IoTTracking.Application.Services.ServiceInterfaces;
using IoTTracking.Core.Entities;
using Microsoft.Extensions.DependencyInjection;

namespace IoTTracking.Application
{
	public static class Extensions
	{
		public static IServiceCollection AddLogicServices(this IServiceCollection services)
		{
			services.AddScoped<IService<Firmware, FirmwareDTO>, FirmwareLogic>();
			services.AddScoped<IFirmwareLogic, FirmwareLogic>();

			services.AddScoped<IService<Groups, GroupsDTO>, GroupsLogic>();
			services.AddScoped<IGroupsLogic, GroupsLogic>();

			services.AddScoped<IService<Devices, DevicesDTO>, DevicesLogic>();
			services.AddScoped<IDevicesLogic, DevicesLogic>();

			return services;
		}
	}
}
