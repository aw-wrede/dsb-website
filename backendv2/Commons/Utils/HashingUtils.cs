using System.Security.Cryptography;
using System.Text;

namespace Commons.Utils;

public static class HashingUtils
{
    public static string Hash(string input)
    {
        var bytes = SHA512.HashData(Encoding.UTF8.GetBytes(input));
        //return Convert.ToBase64String(bytes);
        var builder = new StringBuilder();
        foreach (var t in bytes)
        {
            builder.Append(t.ToString("x2"));
        }

        return builder.ToString();
    }

    public static string Hash(string input, string salt)
    {
        return Hash(input + salt);
    }
    
    public static string Hash(string input, string salt, string pepper)
    {
        return Hash(input + salt + pepper);
    }

    public static string RandomString(int length)
    {
        const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        return new string(Enumerable.Repeat(chars, length)
            .Select(s => s[RandomNumberGenerator.GetInt32(0, s.Length)]).ToArray());
    }
    
}