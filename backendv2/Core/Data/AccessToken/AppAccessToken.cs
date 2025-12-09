using System.Text.Json.Serialization;
using Commons.Utils;
using Core.Controller;
using Core.Data.User;
using Core.Serialization;
using MongoDB.Bson.Serialization.Attributes;

namespace Core.Data.AccessToken;

public class AppAccessToken : IIdentified
{
    public static string CreateToken()
    {
        return HashingUtils.Hash(UuidGenerator.GenerateUuid(), DateTime.Now.Ticks.ToString());
    }
    
    [Newtonsoft.Json.JsonIgnore]
    [BsonId(IdGenerator = typeof(BsonIncrementGenerator<AppAccessToken>))]
    public long Id { get; set; }
    public string Token { get; set; }
    [JsonIgnore]
    public AppUserReference AppUserReference { get; set; }
}