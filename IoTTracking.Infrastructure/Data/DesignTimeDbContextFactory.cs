using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace IoTTracking.Infrastructure.Data
{
	public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext>
	{
		public ApplicationDbContext CreateDbContext(string[] args)
		{
			var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Development";

			if (args != null && args.Length > 0)
			{
				if (args[0] == "Development" || args[0] == "Production")
				{
					env = args[0];
				}
				else
				{
					throw new InvalidOperationException(
						"\r\n\r\n********************************************************************************\n" +
						"Error: INVALID ENVIRONMENT ARGUMENT\n" +
						"Error: Please specify the environment when running the update-database command.\n" +
						"Error: Use 'Development' for the development environment or 'Production' for production.\n" +
						"WARN:Example:\n" +
						"WARN:\tupdate-database -Args 'Development'\n" +
						"WARN:\tupdate-database -Args 'Production'\n" +
						"********************************************************************************");
				}
			}

			var projectPath = Path.GetFullPath(Path.Combine(Directory.GetCurrentDirectory(), @"..\IoTTracking.Server"));
			Console.WriteLine($"Resolved project path: {projectPath}");

			IConfigurationRoot configuration = new ConfigurationBuilder()
				.SetBasePath(projectPath)
				.AddJsonFile("appsettings.json", optional: false)
				.AddJsonFile($"appsettings.{env}.json", optional: true)
				.Build();

			var builder = new DbContextOptionsBuilder<ApplicationDbContext>();
			var connectionString = configuration.GetConnectionString("DefaultConnection");
			builder.UseSqlServer(connectionString);

			return new ApplicationDbContext(builder.Options);
		}
	}
}
