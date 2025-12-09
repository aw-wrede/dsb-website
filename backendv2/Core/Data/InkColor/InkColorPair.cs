using System.Text.Json.Serialization;
using Core.Controller;
using Core.Serialization;
using MongoDB.Bson.Serialization.Attributes;

namespace Core.Data.InkColor;

public class InkColorPair : IIdentified
{
    [JsonIgnore]
    [BsonId(IdGenerator = typeof(BsonIncrementGenerator<InkColorPair>))]
    public long Id { get; set; }
    public int Position { get; set; }
    public string AlphaColor { get; set; }
    public string BetaColor { get; set; }
    
    protected InkColorPair() {}

    public InkColorPair(int position, string alphaColor, string betaColor)
    {
        Position = position;
        AlphaColor = alphaColor;
        BetaColor = betaColor;
    }
    
}