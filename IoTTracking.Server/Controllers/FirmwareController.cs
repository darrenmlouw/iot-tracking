using IoTTracking.Application.DTOs;
using IoTTracking.Application.Services.ServiceInterfaces;
using IoTTracking.Core.Entities;
using IoTTracking.Server.GenericController;

namespace IoTTracking.Server.Controllers
{
	public class FirmwareController(IFirmwareLogic firmwareLogic) : BaseController<Firmware, FirmwareDTO>(firmwareLogic)
	{
		private readonly IFirmwareLogic _firmwareLogic = firmwareLogic;
	}
}
