using AutoMapper;
using IoTTracking.Application.DTOs;
using IoTTracking.Application.RepositoryInterfaces;
using IoTTracking.Application.Services.GenericService;
using IoTTracking.Application.Services.ServiceInterfaces;
using IoTTracking.Core.Entities;

namespace IoTTracking.Application.Services
{
	public class FirmwareLogic : Service<Firmware, FirmwareDTO>, IFirmwareLogic
	{
		private readonly IFirmwareRepository _firmwareRepository;

		public FirmwareLogic(
			IFirmwareRepository repository,
			IUnitOfWork unitOfWork,
			IMapper mapper) : base(repository, unitOfWork, mapper)
		{
			_firmwareRepository = repository;
		}
		protected override List<FirmwareDTO> EntityToDTO(List<Firmware> entities)
		{
			return base.EntityToDTO(entities);
		}
	}
}
