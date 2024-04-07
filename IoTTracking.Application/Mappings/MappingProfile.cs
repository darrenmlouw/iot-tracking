using AutoMapper;
using IoTTracking.Application.DTOs;
using IoTTracking.Core.Entities;

namespace IoTTracking.Application.Mappings
{
	public class MappingProfile : Profile
	{
		public MappingProfile()
		{
			CreateMap<GroupsDTO, Groups>()
				.ForMember(dest => dest.ParentGroup, opt => opt.Ignore())
				.ReverseMap();

			CreateMap<FirmwareDTO, Firmware>()
				.ReverseMap();

			CreateMap<DevicesDTO, Devices>()
				.ForMember(dest => dest.Firmware, opt => opt.Ignore())
				.ForMember(dest => dest.Group, opt => opt.Ignore())
				.ReverseMap();
		}
	}
}
