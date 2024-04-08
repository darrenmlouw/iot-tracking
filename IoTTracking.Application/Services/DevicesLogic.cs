using AutoMapper;
using IoTTracking.Application.DTOs;
using IoTTracking.Application.RepositoryInterfaces;
using IoTTracking.Application.Services.GenericService;
using IoTTracking.Application.Services.ServiceInterfaces;
using IoTTracking.Core.Entities;

namespace IoTTracking.Application.Services
{
	public class DevicesLogic(
		IDevicesRepository repository,
		IUnitOfWork unitOfWork,
		IMapper mapper) : Service<Devices, DevicesDTO>(repository, unitOfWork, mapper), IDevicesLogic
	{
		private readonly IDevicesRepository _devicesRepository = repository;

		protected override List<DevicesDTO> EntityToDTO(List<Devices> entities)
		{
			return base.EntityToDTO(entities);
		}
	}
}
