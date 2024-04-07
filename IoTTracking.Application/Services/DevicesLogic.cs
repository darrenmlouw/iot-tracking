using AutoMapper;
using IoTTracking.Application.DTOs;
using IoTTracking.Application.RepositoryInterfaces;
using IoTTracking.Application.Services.GenericService;
using IoTTracking.Application.Services.ServiceInterfaces;
using IoTTracking.Core.Entities;

namespace IoTTracking.Application.Services
{
	public class DevicesLogic : Service<Devices, DevicesDTO>, IDevicesLogic
	{
		private readonly IDevicesRepository _devicesRepository;

		public DevicesLogic(
			IDevicesRepository repository,
			IUnitOfWork unitOfWork,
			IMapper mapper) : base(repository, unitOfWork, mapper)
		{
			_devicesRepository = repository;
		}
		protected override List<DevicesDTO> EntityToDTO(List<Devices> entities)
		{
			return base.EntityToDTO(entities);
		}
	}
}
