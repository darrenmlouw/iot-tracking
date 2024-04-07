# IoT Tracking

Digital Matter Interview Assessment

## Prerequisites

Before you begin, ensure you have installed the following:
- [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0) or later
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Git](https://git-scm.com/downloads)

## Entity Framework Core CLI
The Entity Framework Core CLI tools are required to apply the migrations to the database. You can install the tools by running the following command:
```bash
dotnet tool install --global dotnet-ef
```

## Development Environment Setup
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Cloning the Repository

To get started, clone the repository to your local machine:

```bash
git clone https://github.com/darrenmlouw/IoTTracking.git
```

## Frontend React Setup
after cloning the repository, navigate to the iottracking.client directory.


### Naivgating to the iottracking.client Project Directory
```bash
cd IotTracking/iottracking.client
```

### Install Node Dependencies
```bash
npm install
```

## Backend API Setup
### Navigate back to the IoTTracking Directory
```bash
cd ..
```

### Naivgating to the IoTTracking.Server Project Directory
```bash
cd IoTTracking.Server
```

### Restore Dependencies
```bash
dotnet restore
```

### Build the Project for Development
```bash
dotnet build --configuration Debug
```

### Apply Migrations
Navigate back to the root directory (IoTTracking)
```bash
cd ..
```

Nagivate to the IoTTracking.Infrastructre directory
```bash
cd IoTTracking.Infrastructure
```

Apply the migrations
```bash
set ASPNETCORE_ENVIRONMENT=Development
dotnet ef database update --project ../IoTTracking.Infrastructure
```
After this step, please ensure that a database named `IoTTrackingDev` has been created and the tables have been created and seeded with data.

If for some reason you cannot apply the migrations, you can run the SQL scripts provided below. After manually creating the database 'IoTTrackingDev', you can run the SQL scripts below to create the tables and seed the data.

### Navigate back to the IoTTracking.Server Project Directory
```bash
cd ../IoTTracking.Server
```

### Run the API Server
```bash
set ASPNETCORE_ENVIRONMENT=Development
dotnet run
```

The API server should now be running on `http://localhost:5154`.
and the React frontend should be running on `https://localhost:5173`.
The Windows will not open automatically, you will need to open the browser and navigate to the URLs.

If the Frontend is not working, you can run the following command from iottracking.client to start the frontend server.
```bash
npm run dev
```

### Swagger Documentation
There is proxy setup for the frontend to communicate with the backend API. The proxy is configured to use the API server running on `http://localhost:5154`.
To access the swagger documentation, navigate to `http://localhost:5154/swagger`.



## SQL Scripts
Create a Database named `IoTTrackingDev` and run the following SQL scripts to create the tables and seed the data.

```sql
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

```
