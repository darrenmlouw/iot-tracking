using IoTTracking.Application.DTOs.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace IoTTracking.Application.DTOs
{
	public class DevicesDTO : IEntityDTO
	{
		[Range(1, int.MaxValue)]
		public int? Id { get; set; }
		public string? Name { get; set; }
		public int? FirmwareId { get; set; }
		public FirmwareDTO? Firmware { get; set; }
		public int? GroupId { get; set; }
		public GroupsDTO? Group { get; set; }
	}
}
