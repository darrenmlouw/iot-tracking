using AutoMapper;
using IoTTracking.Application.DTOs;
using IoTTracking.Application.RepositoryInterfaces;
using IoTTracking.Application.Services.GenericService;
using IoTTracking.Application.Services.ServiceInterfaces;
using IoTTracking.Core.Entities;

namespace IoTTracking.Application.Services
{
	public class GroupsLogic : Service<Groups, GroupsDTO>, IGroupsLogic
	{
		private readonly IGroupsRepository _groupsRepository;

		public GroupsLogic(
			IGroupsRepository repository,
			IUnitOfWork unitOfWork,
			IMapper mapper) : base(repository, unitOfWork, mapper)
		{
			_groupsRepository = repository;
		}
		protected override List<GroupsDTO> EntityToDTO(List<Groups> entities)
		{
			return base.EntityToDTO(entities);
		}
	}
}
