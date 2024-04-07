using IoTTracking.Application.DTOs.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace IoTTracking.Application.DTOs
{
	public class GroupsDTO : IEntityDTO
	{
		[Range(1, int.MaxValue)]
		public int? Id { get; set; }
		public string? Name { get; set; }
		public int? ParentGroupId { get; set; }
		public GroupsDTO? ParentGroup { get; set; }
	}
}
