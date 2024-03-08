namespace Commons.Localization;

public abstract class Localized
{
    public string Name { get; set; }
    public Dictionary<Localization, string> LocalizedNames { get; set; } = new Dictionary<Localization, string>();
        
    public string GetLocalizedName(Localization localization)
    {
        var entry = LocalizedNames.Where(x => x.Key == localization)
            .Select(x => (KeyValuePair<Localization, string>?)x)
            .FirstOrDefault();

        return entry != null ? entry.Value.Value : Name;
    }
}