using Core.Data.AccessToken;
using Core.Data.User;

namespace WebAPI.Utils;

public static class ApiAuthUtils
{
    public static bool IsAuth(string apiToken, out AppUser user)
    {
        if (!AppAccessTokenController.Instance.TryGetByAccessToken(apiToken, out var accessToken))
        {
            user = null;
            return false;
        }

        user = accessToken.AppUserReference.Reference;
        return user != null;
    }
}