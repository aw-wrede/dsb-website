using Commons;
using Commons.Configuration;
using Core.Configuration;
using Core.Controller;
using Core.Data.Calendar;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;

namespace Core;

public class BackendServer : Singleton<BackendServer>
{
    public const double Version = 1.0;

    public ConfigLoader ConfigLoader { get; private set; }
    public IMongoDatabase Database { get; private set; }
    
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
    
    private void RegisterSerializer()
    {
        //BsonSerializer.RegisterSerializer(new EnumSerializer<Localization>(BsonType.String));
    }
    
    private void RegisterController()
    {
        DsbCalendarController.Instance.OnStartup();
    }
}