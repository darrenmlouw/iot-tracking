using IoTTracking.Application.DTOs;
using IoTTracking.Application.Services.ServiceInterfaces;
using IoTTracking.Core.Entities;
using IoTTracking.Server.GenericController;

namespace IoTTracking.Server.Controllers
{
	public class DevicesController(IDevicesLogic devicesLogic) : BaseController<Devices, DevicesDTO>(devicesLogic)
    {
        private readonly IDevicesLogic _devicesLogic = devicesLogic;
	}
}
