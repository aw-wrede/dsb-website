using System.Text.Json.Serialization;
using Commons.Localization;
using Commons.Utils;
using Core.Controller;
using Core.Data.Casting.TourneyTeam;
using Core.Data.User;
using Core.Serialization;
using MongoDB.Bson.Serialization.Attributes;

namespace Core.Data.Casting.Overlay;

public class Overlay : IPublicIdentified
{
    [JsonIgnore]
    [BsonId(IdGenerator = typeof(BsonIncrementGenerator<Overlay>))]
    public long Id { get; set; }
    public string Uuid { get; set; } = UuidGenerator.GenerateUuid();
    
    public string Title { get; set; }
    public OverlayType Type { get; set; }
    public TourneyGameVersion GameVersion { get; set; }
    public int MaxMatches { get; set; }
    public LinkedList<TourneyMatch.TourneyMatch> Matches { get; set; } = [];
    [BsonIgnore]
    public int MatchesCount => Matches.Count;
    [JsonPropertyName("teamAlpha")]
    public TourneyTeamReference TeamAlphaReference { get; set; }
    [JsonPropertyName("teamBeta")]
    public TourneyTeamReference TeamBetaReference { get; set; }

    public Localization Localization { get; set; } = Localization.English;
    public List<AppUserReference> Commentators { get; set; } = [];
}