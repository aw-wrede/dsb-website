using System.Text.Json.Serialization;
using Core.Controller;
using Core.Data.UploadedFile;
using Core.Serialization;
using MongoDB.Bson.Serialization.Attributes;

namespace Core.Data.Casting.TourneyTeam;

public class TourneyTeam : IPublicIdentified
{
    [Newtonsoft.Json.JsonIgnore]
    [BsonId(IdGenerator = typeof(BsonIncrementGenerator<TourneyTeam>))]
    public long Id { get; set; }
    public string Uuid { get; set; }
    
    public string Name { get; set; }
    public List<string> Members { get; set; } = [];
    
    [JsonIgnore]
    public UploadedFileReference? TeamLogo { get; set; }
    [BsonIgnore]
    public string TeamLogoUrl => TeamLogo?.Reference?.CreateUrl() ?? string.Empty;

    public bool TryUpdate(string name, List<string> members)
    {
        Name = name;
        Members = members;

        return TourneyTeamController.Instance.UpdateOneComplete(this);
    }
}