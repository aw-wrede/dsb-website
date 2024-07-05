using Commons;
using Core.Data.AccessToken;
using Core.Data.User;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using Newtonsoft.Json;
using WebAPI.Models;
using JsonConverter = System.Text.Json.Serialization.JsonConverter;

namespace WebAPI.Utils;

public class ApiAuthUtils : ControllerBase
{
    public static bool SetSessionCookie(HttpResponse response, ApiSessionData sessionData)
    {
        var options = new CookieOptions()
        {
            Expires = DateTimeOffset.Now.AddYears(1),
            HttpOnly = true,
        };
        
        response.Cookies.Append("session", JsonConvert.SerializeObject(sessionData), options);
        return true;
    }
    
    public static bool TryGetSessionCookie(HttpRequest request, out ApiSessionData? sessionData)
    {
        sessionData = null;
        
        var sessionCookie = request.Cookies["session"];

        if (string.IsNullOrEmpty(sessionCookie))
        {
            return false;
        }

        sessionData = JsonConvert.DeserializeObject<ApiSessionData>(sessionCookie);
        return sessionData != null;
    }
    
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

    public static bool TryAuth(HttpRequest request, string? apiToken, AppUserGroup accessLevel, out AppUser? user)
    {
        user = null;
        
        // try auth with session cookie
        if (TryGetSessionCookie(request, out var sessionData))
        {
            if (IsAuth(sessionData!, accessLevel, out user))
            {
                return user != null;
            }
        }

        // try auth with api token
        if (string.IsNullOrEmpty(apiToken))
        {
            return false;
        }

        if (IsAuth(apiToken, accessLevel, out user))
        {
            return user != null;
        }
        
        return false;
    }
    
}