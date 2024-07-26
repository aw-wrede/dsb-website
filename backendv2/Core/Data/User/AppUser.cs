using System.Text.Json.Serialization;
using Commons.Utils;
using Core.Controller;
using Core.Data.Casting.Overlay;
using Core.Serialization;
using MongoDB.Bson.Serialization.Attributes;

namespace Core.Data.User;

public class AppUser : IPublicIdentified
{
    [JsonIgnore]
    [BsonId(IdGenerator = typeof(BsonIncrementGenerator<AppUser>))]
    public long Id { get; set; }
    public string Uuid { get; set; } = UuidGenerator.GenerateUuid();
    public string Name { get; set; }
    public string DisplayName { get; set; }
    public AppUserGroup UserGroup { get; set; }
    [JsonIgnore]
    public AppUserCredentials? Credentials { get; set; }
    [JsonIgnore]
    public List<AppUserSessionData> SessionData { get; set; } = [];
    
    [JsonIgnore]
    public OverlayReference? SelectedOverlay { get; set; }
    
    [BsonIgnore]
    [JsonPropertyName("selectedOverlay")]
    public string? SelectedOverlayUuid => SelectedOverlay?.Reference?.Uuid;

    public AppUser() {}

    public AppUser(string name, string displayName, string password)
    {
        Uuid = UuidGenerator.GenerateUuid();
        Name = name;
        DisplayName = displayName;
        Credentials = AppUserCredentials.Create(password, true);
    }
    
    public bool VerifyLoginAttempt(string password)
    {
        return Credentials != null && Credentials.Verify(password);
    }

    public bool VerifySessionToken(string token)
    {
        return SessionData.Any(sessionData => sessionData.Verify(token));
    }

    public bool RemoveSessionToken(string token)
    {
        var session = SessionData.FirstOrDefault(s => s?.SessionToken == token, null);
        if (session == null)
        {
            return false;
        }

        SessionData.Remove(session);
        return true;
    }
    
    public AppUserSessionData CreateNewSessionData()
    {
        // Remove invalid session data to free space (validity is checked independently from this)
        SessionData = SessionData.Where(s => !s.IsExpired()).ToList();
        
        var session = AppUserSessionData.Create();
        SessionData.Add(session);
        
        return session;
    }

    public void SetCredentials(string password)
    {
        Credentials = AppUserCredentials.Create(password, true);
    }
    
    public AppUserReference CreateReference()
    {
        return new AppUserReference()
        {
            ReferenceId = Id
        };
    }
}