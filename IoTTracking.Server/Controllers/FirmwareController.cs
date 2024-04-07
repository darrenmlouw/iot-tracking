using IoTTracking.Application.DTOs;
using IoTTracking.Application.Services.ServiceInterfaces;
using IoTTracking.Core.Entities;
using IoTTracking.Server.GenericController;

namespace IoTTracking.Server.Controllers
{
    public class FirmwareController : BaseController<Firmware, FirmwareDTO>
	{
		private readonly IFirmwareLogic _firmwareLogic;

		public FirmwareController(IFirmwareLogic firmwareLogic) : base(firmwareLogic)
		{
			_firmwareLogic = firmwareLogic;
		}
	}
}
