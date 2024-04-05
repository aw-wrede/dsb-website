using Commons.Utils;
using Core.Controller;

namespace Core.Data.User;

public class AppUserCredentials : IMapped
{
    public static string Pepper { get; set; } = "PUntPcV5hQkVkSyH";
    private static int SaltLength = 16;

    public static AppUserCredentials Create(string password, bool enabled = true)
    {
        var salt = HashingUtils.RandomString(SaltLength);
        return new AppUserCredentials()
        {
            Enabled = enabled,
            Salt = salt,
            PasswordHash = HashingUtils.Hash(password, salt: salt, pepper: Pepper)
        };
    }
    
    public string PasswordHash { get; set; }
    public string Salt { get; set; } = "";
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

        return PasswordHash == HashingUtils.Hash(input, Salt, Pepper);
    }
    
}