using IoTTracking.Core.Entities.Interfaces;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IoTTracking.Core.Entities
{
	public class Groups : IEntity
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		[Column("GroupId")]
		public int Id { get; set; }

		[Column(TypeName = "VARCHAR(255)")]
		public string Name { get; set; } = null!;

		public int? ParentGroupId { get; set; }
		public Groups? ParentGroup { get; set; }
		public ICollection<Groups> SubGroups { get; set; } = new List<Groups>();
		public ICollection<Devices> Devices { get; set; } = new List<Devices>();
	}
}
