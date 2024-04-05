using Commons.Configuration;

namespace Core.Configuration;

public class FileUploadConfiguration : IConfiguration
{
    public string ConfigurationName { get; } = "FileUpload";
    
    public string Path { get; set; }
    public string BaseUrl { get; set; }

    public void LoadDefault()
    {
        Path = "./";
        BaseUrl = "/";
    }
}