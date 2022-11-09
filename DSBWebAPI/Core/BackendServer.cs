using System;
using System.Linq;
using Commons;
using Commons.Configuration;
using Commons.Localization;
using Core.Configuration;
using Core.Controller;
using Core.Data.Tournament;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Serializers;
using MongoDB.Driver;

namespace Core
{
    public class BackendServer : Singleton<BackendServer>
    {
        public const double Version = 1.0;
        public const string BaseRoute = "api/";

        public static Localization DefaultLocalization = Localization.English;

        public readonly DSBConfiguration DsbConfiguration;
        
        public ConfigLoader ConfigLoader { get; private set; }
        public IMongoDatabase Database { get; private set; }
        
        protected BackendServer()
        {
            ConfigLoader = new ConfigLoader();
            DsbConfiguration = ConfigLoader.GetConfiguration<DSBConfiguration>();
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

        public void OnStop()
        {
            
        }
        
        #region Private Methods

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
            BsonSerializer.RegisterSerializer(new EnumSerializer<Localization>(BsonType.String));
        }

        private void RegisterController()
        {
            TournamentController.Instance.OnStartup();
        }

        #endregion
    }
}