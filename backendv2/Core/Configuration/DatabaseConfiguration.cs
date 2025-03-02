using Commons.Configuration;

namespace Core.Configuration;

public class DatabaseConfiguration : IConfiguration
{
    public string ConfigurationName { get; } = "Database";
            
    public string Host { get; set; }
    public int Port { get; set; }
    public string Database { get; set; }

    public bool UsePasswordAuth { get; set; }
        
    public string Username { get; set; }
        
    public string Password { get; set; }
        
    public void LoadDefault()
    {
        Host = "127.0.0.1";
        Port = 27017;
        Database = "DSB";
        UsePasswordAuth = false;
        Username = "";
        Password = "";
    }
        
}