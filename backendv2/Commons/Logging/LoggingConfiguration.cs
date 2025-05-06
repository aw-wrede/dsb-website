using Commons.Configuration;

namespace Commons.Logging;

public class LoggingConfiguration : IConfiguration
{
    public string ConfigurationName { get; } = "Logging";

    public string Path { get; set; } = "./logs/latest.log";

    public LogLevel LogLevel { get; set; } = LogLevel.Information;

}