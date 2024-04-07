IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
GO

CREATE TABLE [Firmwares] (
    [FirmwareId] int NOT NULL IDENTITY,
    [Version] VARCHAR(255) NOT NULL,
    CONSTRAINT [PK_Firmwares] PRIMARY KEY ([FirmwareId])
);
GO

CREATE TABLE [Groups] (
    [GroupId] int NOT NULL IDENTITY,
    [Name] VARCHAR(255) NOT NULL,
    [ParentGroupId] int NULL,
    CONSTRAINT [PK_Groups] PRIMARY KEY ([GroupId]),
    CONSTRAINT [FK_Groups_Groups_ParentGroupId] FOREIGN KEY ([ParentGroupId]) REFERENCES [Groups] ([GroupId]) ON DELETE NO ACTION
);
GO

CREATE TABLE [Devices] (
    [DeviceId] int NOT NULL IDENTITY,
    [Name] VARCHAR(255) NOT NULL,
    [FirmwareId] int NOT NULL,
    [GroupId] int NULL,
    CONSTRAINT [PK_Devices] PRIMARY KEY ([DeviceId]),
    CONSTRAINT [FK_Devices_Firmwares_FirmwareId] FOREIGN KEY ([FirmwareId]) REFERENCES [Firmwares] ([FirmwareId]) ON DELETE CASCADE,
    CONSTRAINT [FK_Devices_Groups_GroupId] FOREIGN KEY ([GroupId]) REFERENCES [Groups] ([GroupId]) ON DELETE NO ACTION
);
GO

IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'FirmwareId', N'Version') AND [object_id] = OBJECT_ID(N'[Firmwares]'))
    SET IDENTITY_INSERT [Firmwares] ON;
INSERT INTO [Firmwares] ([FirmwareId], [Version])
VALUES (1, 'v1.2.5'),
(2, 'v1.3.0'),
(3, 'v2.0.1');
IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'FirmwareId', N'Version') AND [object_id] = OBJECT_ID(N'[Firmwares]'))
    SET IDENTITY_INSERT [Firmwares] OFF;
GO

IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'GroupId', N'Name', N'ParentGroupId') AND [object_id] = OBJECT_ID(N'[Groups]'))
    SET IDENTITY_INSERT [Groups] ON;
INSERT INTO [Groups] ([GroupId], [Name], [ParentGroupId])
VALUES (1, 'North America', NULL),
(2, 'Europe', NULL),
(3, 'Asia', NULL),
(4, 'USA', 1),
(5, 'Canada', 1),
(6, 'Germany', 2),
(7, 'France', 2),
(8, 'China', 3),
(9, 'Japan', 3);
IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'GroupId', N'Name', N'ParentGroupId') AND [object_id] = OBJECT_ID(N'[Groups]'))
    SET IDENTITY_INSERT [Groups] OFF;
GO

IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'DeviceId', N'FirmwareId', N'GroupId', N'Name') AND [object_id] = OBJECT_ID(N'[Devices]'))
    SET IDENTITY_INSERT [Devices] ON;
INSERT INTO [Devices] ([DeviceId], [FirmwareId], [GroupId], [Name])
VALUES (1, 1, 4, 'Thermostat - Office 101'),
(2, 2, 4, 'Security Camera - Entrance'),
(3, 1, 5, 'Smart Light - Hallway'),
(4, 3, 6, 'HVAC System - HQ'),
(5, 2, 7, 'Door Lock - Warehouse'),
(6, 1, 8, 'Water Sensor - Basement'),
(7, 3, 9, 'Air Quality Monitor - Lab');
IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'DeviceId', N'FirmwareId', N'GroupId', N'Name') AND [object_id] = OBJECT_ID(N'[Devices]'))
    SET IDENTITY_INSERT [Devices] OFF;
GO

CREATE INDEX [IX_Devices_FirmwareId] ON [Devices] ([FirmwareId]);
GO

CREATE INDEX [IX_Devices_GroupId] ON [Devices] ([GroupId]);
GO

CREATE UNIQUE INDEX [IX_Firmwares_Version] ON [Firmwares] ([Version]);
GO

CREATE INDEX [IX_Groups_ParentGroupId] ON [Groups] ([ParentGroupId]);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20240407124247_V1.0.0', N'8.0.3');
GO

COMMIT;
GO

