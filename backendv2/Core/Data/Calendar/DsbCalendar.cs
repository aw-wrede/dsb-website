using System.Text.Json.Serialization;
using Commons.Utils;
using Core.Controller;
using Core.Serialization;
using MongoDB.Bson.Serialization.Attributes;

namespace Core.Data.Calendar;

public class DsbCalendar : IPublicIdentified
{
    [JsonIgnore]
    [BsonId(IdGenerator = typeof(BsonIncrementGenerator<DsbCalendar>))]
    public long Id { get; set; }

    public string Uuid { get; set; } = UuidGenerator.GenerateUuid();
    public string Name { get; set; }
    public string ColorHex { get; set; }
    [JsonPropertyName("calendarEntries")]
    public List<DsbCalendarEntry> Entries { get; set; } = [];
}