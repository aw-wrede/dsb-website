using Commons.Utils;

namespace Core.Data.User;

public class AppUserSessionData
{
    private static readonly TimeSpan ExpiryTime = TimeSpan.FromDays(30);

    private static string CreateToken()
    {
        return HashingUtils.Hash(UuidGenerator.GenerateUuid(), DateTime.Now.Ticks.ToString());
    }
    
    public static AppUserSessionData Create()
    {
        return new AppUserSessionData()
        {
            ExpiryDate = DateTime.Now + ExpiryTime,
            SessionToken = CreateToken()
        };
    }
    
    public string SessionToken { get; set; }
    public DateTime ExpiryDate { get; set; }

    public bool IsExpired()
    {
        return ExpiryDate > DateTime.Now;
    }
    public bool Verify(string input)
    {
        return SessionToken == input;
    }
}