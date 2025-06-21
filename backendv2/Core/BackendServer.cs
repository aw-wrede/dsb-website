using Commons;
using Commons.Configuration;
using Commons.Localization;
using Commons.Logging;
using Core.Configuration;
using Core.Controller;
using Core.Data.Calendar;
using Core.Data.Casting.Overlay;
using Core.Data.Casting.OverlayTemplate;
using Core.Data.Casting.TourneyMap;
using Core.Data.InkColor;
using Core.Data.UploadedFile;
using Core.Data.User;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Serializers;
using MongoDB.Driver;

namespace Core;

public class BackendServer : Singleton<BackendServer>
{
    public const double Version = 1.01;
    private static readonly object Lock = new();

    public ConfigLoader ConfigLoader { get; private set; }
    public IMongoDatabase Database { get; private set; }
    public FileUploadConfiguration FileUploadConfiguration { get; private set; }
    
    public LoggingConfiguration LoggingConfiguration { get; private set; }
    
    protected BackendServer()
    {
        ConfigLoader = new ConfigLoader();
    }
    
    public void OnStartup()
    {
        AppDomain.CurrentDomain.GetAssemblies().SelectMany(x =>
                x.GetTypes()).Where(x => !x.IsAbstract && typeof(IMapped).IsAssignableFrom(x)).ToList()
            .ForEach(t => BsonClassMap.LookupClassMap(t));
        
        OpenDatabase();

        FileUploadConfiguration = ConfigLoader.GetConfiguration<FileUploadConfiguration>();
        LoggingConfiguration = ConfigLoader.GetConfiguration<LoggingConfiguration>();

        #region Log File

        if (!File.Exists(LoggingConfiguration.Path))
        {
            var fileInfo = new FileInfo(LoggingConfiguration.Path);
            Directory.CreateDirectory(fileInfo.DirectoryName);
            
            File.Create(LoggingConfiguration.Path).Close();
        }
        
        Logger.RegisterCallback((level, message, exception) =>
        {
            if (level < LoggingConfiguration.LogLevel)
            {
                return;
            }

            lock (Lock)
            {
                using var outputFile = new StreamWriter(LoggingConfiguration.Path, true);
                outputFile.WriteLine($"{DateTime.Now.ToLongTimeString()} [{level}] {message}");
            }
            
        });

        #endregion
        
        
        
        RegisterSerializer();
        RegisterController();
    }
    
    private void OpenDatabase()
    {
        var config = ConfigLoader.GetConfiguration<DatabaseConfiguration>();
            
        Logger.Info($"Database: Connecting to {config.Host}:{config.Port}");
            
        var client = new MongoClient($"mongodb://{config.Host}:{config.Port}");
        Database = client.GetDatabase(config.Database);
            
        Logger.Info($"Database: Using Database '{config.Database}'");
    }
    
    private static void RegisterSerializer()
    {
        BsonSerializer.RegisterSerializer(new EnumSerializer<Localization>(BsonType.String));
    }
    
    private static void RegisterController()
    {
        DsbCalendarController.Instance.OnStartup();
        AppUserController.Instance.OnStartup();
        UploadedFileController.Instance.OnStartup();
        TourneyMapController.Instance.OnStartup();
        OverlayTemplateController.Instance.OnStartup();
        OverlayController.Instance.OnStartup();
        InkColorPairController.Instance.OnStartup();
    }
}