using IoTTracking.Application.DTOs;
using IoTTracking.Application.Services.ServiceInterfaces;
using IoTTracking.Core.Entities;
using IoTTracking.Server.GenericController;

namespace IoTTracking.Server.Controllers
{
	public class DevicesController : BaseController<Devices, DevicesDTO>
    {
        private readonly IDevicesLogic _devicesLogic;

        public DevicesController(IDevicesLogic devicesLogic) : base(devicesLogic)
        {
            _devicesLogic = devicesLogic;
        }
    }
}
