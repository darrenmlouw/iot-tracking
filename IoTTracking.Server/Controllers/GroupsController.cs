using IoTTracking.Application.DTOs;
using IoTTracking.Application.Services.ServiceInterfaces;
using IoTTracking.Core.Entities;
using IoTTracking.Server.GenericController;

namespace IoTTracking.Server.Controllers
{
    public class GroupsController : BaseController<Groups, GroupsDTO>
	{
		private readonly IGroupsLogic _groupsLogic;

		public GroupsController(IGroupsLogic groupsLogic) : base(groupsLogic)
		{
			_groupsLogic = groupsLogic;
		}
	}
}
