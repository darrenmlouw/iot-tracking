using IoTTracking.Core.Entities.Interfaces;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IoTTracking.Core.Entities
{
	public class Devices : IEntity
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		[Column("DeviceId")]
		public int Id { get; set; }

		[Column(TypeName = "VARCHAR(255)")]
		public string Name { get; set; } = null!;
		public int FirmwareId { get; set; }
		public Firmware Firmware { get; set; } = null!;
		public int? GroupId { get; set; }
		public Groups Group { get; set; } = null!;
	}
}
