using IoTTracking.Application.DTOs;
using IoTTracking.Application.Services.GenericService.Interfaces;
using IoTTracking.Core.Entities;

namespace IoTTracking.Application.Services.ServiceInterfaces
{
	public interface IFirmwareLogic : IService<Firmware, FirmwareDTO>
	{
	}
}
