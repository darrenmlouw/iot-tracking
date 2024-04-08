using IoTTracking.Core.Entities;
using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
{
	public DbSet<Devices> Devices { get; set; }
	public DbSet<Firmware> Firmwares { get; set; }
	public DbSet<Groups> Groups { get; set; }

	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{
		base.OnModelCreating(modelBuilder);

		modelBuilder.Entity<Devices>()
			.HasOne(d => d.Firmware)
			.WithMany(f => f.Devices)
			.HasForeignKey(d => d.FirmwareId);

		modelBuilder.Entity<Devices>()
			.HasOne(d => d.Group)
			.WithMany(g => g.Devices)
			.HasForeignKey(d => d.GroupId)
			.OnDelete(DeleteBehavior.Restrict);

		modelBuilder.Entity<Groups>()
			.HasOne(g => g.ParentGroup)
			.WithMany(g => g.SubGroups)
			.HasForeignKey(g => g.ParentGroupId)
			.IsRequired(false)
			.OnDelete(DeleteBehavior.Restrict);

		modelBuilder.Entity<Firmware>()
			.HasIndex(f => f.Version)
			.IsUnique();

		AddInitialData(modelBuilder);
	}

	private static void AddInitialData(ModelBuilder modelBuilder)
	{
		// Seed Firmware Versions
		var firmwares = new[]
		{
			new Firmware { Id = 1, Version = "v1.2.5" },
			new Firmware { Id = 2, Version = "v1.3.0" },
			new Firmware { Id = 3, Version = "v2.0.1" }
		};
		modelBuilder.Entity<Firmware>().HasData(firmwares);

		// Seed Groups with a hierarchical structure
		var groups = new[]
		{
			new Groups { Id = 1, Name = "North America", ParentGroupId = null },
			new Groups { Id = 2, Name = "Europe", ParentGroupId = null },
			new Groups { Id = 3, Name = "Asia", ParentGroupId = null },
			new Groups { Id = 4, Name = "USA", ParentGroupId = 1 },
			new Groups { Id = 5, Name = "Canada", ParentGroupId = 1 },
			new Groups { Id = 6, Name = "Germany", ParentGroupId = 2 },
			new Groups { Id = 7, Name = "France", ParentGroupId = 2 },
			new Groups { Id = 8, Name = "China", ParentGroupId = 3 },
			new Groups { Id = 9, Name = "Japan", ParentGroupId = 3 }
		};
		modelBuilder.Entity<Groups>().HasData(groups);

		// Seed Devices with associations to firmware and groups
		var devices = new[]
		{
			new Devices { Id = 1, Name = "Thermostat - Office 101", FirmwareId = 1, GroupId = 4 },
			new Devices { Id = 2, Name = "Security Camera - Entrance", FirmwareId = 2, GroupId = 4 },
			new Devices { Id = 3, Name = "Smart Light - Hallway", FirmwareId = 1, GroupId = 5 },
			new Devices { Id = 4, Name = "HVAC System - HQ", FirmwareId = 3, GroupId = 6 },
			new Devices { Id = 5, Name = "Door Lock - Warehouse", FirmwareId = 2, GroupId = 7 },
			new Devices { Id = 6, Name = "Water Sensor - Basement", FirmwareId = 1, GroupId = 8 },
			new Devices { Id = 7, Name = "Air Quality Monitor - Lab", FirmwareId = 3, GroupId = 9 }
		};
		modelBuilder.Entity<Devices>().HasData(devices);
	}
}
