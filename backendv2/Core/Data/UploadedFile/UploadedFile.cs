using Commons.Utils;
using Core.Controller;
using Core.Data.User;
using Core.Serialization;
using MongoDB.Bson.Serialization.Attributes;

namespace Core.Data.UploadedFile;

public class UploadedFile : IPublicIdentified
{
    [Newtonsoft.Json.JsonIgnore]
    [BsonId(IdGenerator = typeof(BsonIncrementGenerator<UploadedFile>))]
    public long Id { get; set; }
    public string Uuid { get; set; } = UuidGenerator.GenerateUuid();
    public string ContentType { get; set; }
    public DateTime TimeCreated { get; set; }
    public AppUserGroup AccessLevel { get; set; }
    
    public string CreateUrl()
    {
        return $"{BackendServer.Instance.FileUploadConfiguration.BaseUrl}file/{Uuid}";
    }

    public UploadedFileReference CreateReference()
    {
        return new UploadedFileReference()
        {
            ReferenceId = Id
        };
    }

    public Stream GetFileStream()
    {
        var path = Path.Combine(BackendServer.Instance.FileUploadConfiguration.Path, Uuid);
        return File.OpenRead(path);
    }
}