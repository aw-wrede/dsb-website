using System.Text.Json.Serialization;
using Commons.Localization;
using Core.Controller;
using Core.Serialization;
using MongoDB.Bson.Serialization.Attributes;

namespace Core.Data.Casting.TourneyMap;

public class TourneyMap : Localized, IIdentified
{
    [JsonIgnore]
    [BsonId(IdGenerator = typeof(BsonIncrementGenerator<TourneyMap>))]
    public long Id { get; set; }
    public TourneyMapType MapIdentifier { get; set; }
    public TourneyGameVersion GameVersion { get; set; }
    [JsonPropertyName("image")]
    public string ThumbnailImageLink { get; set; }
}