using IoTTracking.Application.DTOs;
using IoTTracking.Application.Services.ServiceInterfaces;
using IoTTracking.Core.Entities;
using IoTTracking.Server.GenericController;

namespace IoTTracking.Server.Controllers
{
	public class GroupsController(IGroupsLogic groupsLogic) : BaseController<Groups, GroupsDTO>(groupsLogic)
	{
		private readonly IGroupsLogic _groupsLogic = groupsLogic;
	}
}
