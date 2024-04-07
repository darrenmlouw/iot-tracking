using IoTTracking.Core.Entities.Interfaces;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IoTTracking.Core.Entities
{
	public class Firmware : IEntity
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		[Column("FirmwareId")]
		public int Id { get; set; }

		[Column(TypeName = "VARCHAR(255)")]
		[RegularExpression(@"^v\d+\.\d+\.\d+$")]
		public string Version { get; set; } = null!;
		public ICollection<Devices> Devices { get; set; } = new List<Devices>();
	}
}
