using Core.Data.AccessToken;
using Core.Data.User;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Models;

namespace WebAPI.Utils;

public class ApiAuthUtils : ControllerBase
{
    public static bool IsAuth(string apiToken, AppUserGroup accessLevel, out AppUser? user)
    {
        if (!AppAccessTokenController.Instance.TryGetByAccessToken(apiToken, out var accessToken))
        {
            user = null;
            return false;
        }
        
        user = accessToken.AppUserReference.Reference;

        if (user == null)
        {
            return false;
        }

        if (user.UserGroup >= accessLevel) return true;
        
        user = null;
        return false;

    }

    public static bool IsAuth(ApiSessionData sessionData, AppUserGroup accessLevel, out AppUser? user)
    {
        if (AppUserController.Instance.CheckSessionToken(sessionData.Uuid, sessionData.SessionToken, out user))
        {
            if (user?.UserGroup >= accessLevel)
            {
                return true;
            }
        }

        user = null;
        return false;
    }
    
    public bool TryAuth(string apiToken, AppUserGroup accessLevel, out ActionResult? error, out AppUser? user)
    {
        user = null;
        
        if (string.IsNullOrEmpty(apiToken))
        {
            error = BadRequest();
            return false;
        }
        
        if (!IsAuth(apiToken, accessLevel, out user))
        {
            error = Unauthorized();
            return false;
        }

        if (user == null)
        {
            error = StatusCode(500);
            return false;
        }
        
        if (user.UserGroup < accessLevel)
        {
            error = Unauthorized();
            return false;
        }

        error = null;
        
        return true;
    }
}