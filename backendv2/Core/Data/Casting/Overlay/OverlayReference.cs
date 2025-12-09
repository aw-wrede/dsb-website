using System.Text.Json.Serialization;
using Core.Controller;
using MongoDB.Bson.Serialization.Attributes;

namespace Core.Data.Casting.Overlay;

public class OverlayReference : IMapped
{
    [JsonIgnore]
    public long ReferenceId { get; set; }
    
    [BsonIgnore]
    public Overlay? Reference
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
    private Overlay? _reference;
    
    private Overlay? GetReference()
    {
        return OverlayController.Instance.TryGetById(ReferenceId, out var overlay) ? overlay : null;
    }
}