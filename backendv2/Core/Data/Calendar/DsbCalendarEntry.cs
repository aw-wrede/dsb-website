using System.Text.Json.Serialization;

namespace Core.Data.Calendar;

public class DsbCalendarEntry
{
    public string Name { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public string Location { get; set; }
    public string LocationUrl { get; set; }
    public string ColorHex { get; set; }
    [JsonIgnore]
    public bool Hidden { get; set; } = false;
    [JsonIgnore]
    public bool HideAfterEvent { get; set; } = false;
}