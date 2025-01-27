using Commons.Utils;
using Core.Controller;

namespace Core.Data.User;

public class AppUserCredentials : IMapped
{
    private static int SaltLength = 16;

    public static AppUserCredentials Create(string password, bool enabled = true)
    {
        return new AppUserCredentials()
        {
            Enabled = enabled,
            PasswordHash = HashingUtils.HashPassword(password)
        };
    }
    
    public string PasswordHash { get; set; }
    public bool Enabled { get; set; } = false;
    
    public bool Verify(string input)
    {
        if (!Enabled)
        {
            return false;
        }
        
        if (string.IsNullOrEmpty(PasswordHash))
        {
            return false;
        }

        return HashingUtils.CheckPassword(input, PasswordHash);
    }
    
}