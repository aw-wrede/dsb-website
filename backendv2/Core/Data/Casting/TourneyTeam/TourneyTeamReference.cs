using System.Text.Json.Serialization;
using Core.Controller;
using MongoDB.Bson.Serialization.Attributes;

namespace Core.Data.Casting.TourneyTeam;

public class TourneyTeamReference : IMapped
{
    [JsonIgnore]
    public long ReferenceId { get; set; }
    
    [BsonIgnore]
    public TourneyTeam? Reference
    {
        get
        {
            return _reference ??= GetReference();
        }
        private set
        {
            if (value != null) _reference = value;
        }
    }
    
    [BsonIgnore]
    private TourneyTeam? _reference;
    
    private TourneyTeam? GetReference()
    {
        return TourneyTeamController.Instance.TryGetById(ReferenceId, out var team) ? team : null;
    }
}