using AutoMapper;
using IoTTracking.Application.DTOs;
using IoTTracking.Application.RepositoryInterfaces;
using IoTTracking.Application.Services.GenericService;
using IoTTracking.Application.Services.ServiceInterfaces;
using IoTTracking.Core.Entities;

namespace IoTTracking.Application.Services
{
	public class GroupsLogic(
		IGroupsRepository repository,
		IUnitOfWork unitOfWork,
		IMapper mapper) : Service<Groups, GroupsDTO>(repository, unitOfWork, mapper), IGroupsLogic
	{
		private readonly IGroupsRepository _groupsRepository = repository;

		protected override List<GroupsDTO> EntityToDTO(List<Groups> entities)
		{
			return base.EntityToDTO(entities);
		}
	}
}
