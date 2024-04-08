using AutoMapper;
using IoTTracking.Application.DTOs;
using IoTTracking.Application.RepositoryInterfaces;
using IoTTracking.Application.Services.GenericService;
using IoTTracking.Application.Services.ServiceInterfaces;
using IoTTracking.Core.Entities;

namespace IoTTracking.Application.Services
{
	public class FirmwareLogic(
		IFirmwareRepository repository,
		IUnitOfWork unitOfWork,
		IMapper mapper) : Service<Firmware, FirmwareDTO>(repository, unitOfWork, mapper), IFirmwareLogic
	{
		private readonly IFirmwareRepository _firmwareRepository = repository;

		protected override List<FirmwareDTO> EntityToDTO(List<Firmware> entities)
		{
			return base.EntityToDTO(entities);
		}
	}
}
