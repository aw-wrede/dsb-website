using System.Text.Json.Serialization;
using Commons.Localization;
using Commons.Utils;
using Core.Controller;
using Core.Data.Casting.Overlay;
using Core.Serialization;
using MongoDB.Bson.Serialization.Attributes;

namespace Core.Data.Casting.OverlayTemplate;

public class OverlayTemplate : IPublicIdentified
{
    [JsonIgnore]
    [BsonId(IdGenerator = typeof(BsonIncrementGenerator<OverlayTemplate>))]
    public long Id { get; set; }
    public string Uuid { get; set; } = UuidGenerator.GenerateUuid();
    
    public string Title { get; set; }
    public OverlayType Type { get; set; }
    public TourneyGameVersion GameVersion { get; set; }
    public int MaxMatches { get; set; }
    public LinkedList<TourneyMatch.TourneyMatch> Matches { get; set; } = [];
    public Localization Localization { get; set; } = Localization.English;
}