using IoTTracking.Application.DTOs.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace IoTTracking.Application.DTOs
{
	public class FirmwareDTO : IEntityDTO
	{
		[Range(1, int.MaxValue)]
		public int? Id { get; set; }
		public string? Version { get; set; }
		//public List<DevicesDTO>? Devices { get; set; }
	}
}
