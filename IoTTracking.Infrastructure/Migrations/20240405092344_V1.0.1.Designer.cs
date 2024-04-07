﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace IoTTracking.Infrastructure.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20240405092344_V1.0.1")]
    partial class V101
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("IoTTracking.Core.Entities.Devices", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("FirmwareId")
                        .HasColumnType("int");

                    b.Property<int?>("GroupId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("FirmwareId");

                    b.HasIndex("GroupId");

                    b.ToTable("Devices");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            FirmwareId = 1,
                            GroupId = 4,
                            Name = "Thermostat - Office 101"
                        },
                        new
                        {
                            Id = 2,
                            FirmwareId = 2,
                            GroupId = 4,
                            Name = "Security Camera - Entrance"
                        },
                        new
                        {
                            Id = 3,
                            FirmwareId = 1,
                            GroupId = 5,
                            Name = "Smart Light - Hallway"
                        },
                        new
                        {
                            Id = 4,
                            FirmwareId = 3,
                            GroupId = 6,
                            Name = "HVAC System - HQ"
                        },
                        new
                        {
                            Id = 5,
                            FirmwareId = 2,
                            GroupId = 7,
                            Name = "Door Lock - Warehouse"
                        },
                        new
                        {
                            Id = 6,
                            FirmwareId = 1,
                            GroupId = 8,
                            Name = "Water Sensor - Basement"
                        },
                        new
                        {
                            Id = 7,
                            FirmwareId = 3,
                            GroupId = 9,
                            Name = "Air Quality Monitor - Lab"
                        });
                });

            modelBuilder.Entity("IoTTracking.Core.Entities.Firmware", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Version")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Firmwares");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Version = "v1.2.5"
                        },
                        new
                        {
                            Id = 2,
                            Version = "v1.3.0"
                        },
                        new
                        {
                            Id = 3,
                            Version = "v2.0.1"
                        });
                });

            modelBuilder.Entity("IoTTracking.Core.Entities.Groups", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("ParentGroupId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ParentGroupId");

                    b.ToTable("Groups");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "North America"
                        },
                        new
                        {
                            Id = 2,
                            Name = "Europe"
                        },
                        new
                        {
                            Id = 3,
                            Name = "Asia"
                        },
                        new
                        {
                            Id = 4,
                            Name = "USA",
                            ParentGroupId = 1
                        },
                        new
                        {
                            Id = 5,
                            Name = "Canada",
                            ParentGroupId = 1
                        },
                        new
                        {
                            Id = 6,
                            Name = "Germany",
                            ParentGroupId = 2
                        },
                        new
                        {
                            Id = 7,
                            Name = "France",
                            ParentGroupId = 2
                        },
                        new
                        {
                            Id = 8,
                            Name = "China",
                            ParentGroupId = 3
                        },
                        new
                        {
                            Id = 9,
                            Name = "Japan",
                            ParentGroupId = 3
                        });
                });

            modelBuilder.Entity("IoTTracking.Core.Entities.Devices", b =>
                {
                    b.HasOne("IoTTracking.Core.Entities.Firmware", "Firmware")
                        .WithMany("Devices")
                        .HasForeignKey("FirmwareId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("IoTTracking.Core.Entities.Groups", "Group")
                        .WithMany("Devices")
                        .HasForeignKey("GroupId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.Navigation("Firmware");

                    b.Navigation("Group");
                });

            modelBuilder.Entity("IoTTracking.Core.Entities.Groups", b =>
                {
                    b.HasOne("IoTTracking.Core.Entities.Groups", "ParentGroup")
                        .WithMany("SubGroups")
                        .HasForeignKey("ParentGroupId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.Navigation("ParentGroup");
                });

            modelBuilder.Entity("IoTTracking.Core.Entities.Firmware", b =>
                {
                    b.Navigation("Devices");
                });

            modelBuilder.Entity("IoTTracking.Core.Entities.Groups", b =>
                {
                    b.Navigation("Devices");

                    b.Navigation("SubGroups");
                });
#pragma warning restore 612, 618
        }
    }
}