using System.Text.Json.Serialization;
using Core.Controller;
using Core.Serialization;
using MongoDB.Bson.Serialization.Attributes;

namespace Core.Data.Calendar;

public class DsbCalendar : IPublicIdentified
{
    [Newtonsoft.Json.JsonIgnore]
    [BsonId(IdGenerator = typeof(BsonIncrementGenerator<DsbCalendar>))]
    public long Id { get; set; }
    public string Uuid { get; set; }
    public string Name { get; set; }
    public string ColorHex { get; set; }
    [JsonPropertyName("calendarEntries")]
    public List<DsbCalendarEntry> Entries { get; set; } = new List<DsbCalendarEntry>();
}