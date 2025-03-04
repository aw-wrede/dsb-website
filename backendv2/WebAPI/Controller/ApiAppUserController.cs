using Commons;
using Core.Data.User;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Models;
using WebAPI.Utils;

namespace WebAPI.Controller;

[ApiController]
[Route("api/user")]
public class ApiAppUserController : ControllerBase
{
    
    [HttpGet]
    [Route("get")]
    public ActionResult<AppUser> Get(string? uuid, string? apiToken)
    {
        if (!ApiAuthUtils.TryAuth(Request, Response, apiToken, AppUserGroup.Guest, out var user))
        {
            return Unauthorized();
        }
        
        if (user == null)
        {
            return StatusCode(500);
        }
        
        Logger.Debug($"{user!.Name} fetches user data");
        
        if (string.IsNullOrEmpty(uuid) || uuid == user.Uuid)
        {
            return Ok(user);
        }

        if (AppUserController.Instance.TryGetByUuid(uuid, out var reqUser))
        {
            return Ok(reqUser);
        }

        return NotFound();
    }
    
    [HttpGet]
    [Route("getall")]
    public ActionResult<AppUser[]> GetAll(string? apiToken)
    {
        if (!ApiAuthUtils.TryAuth(Request, Response, apiToken, AppUserGroup.Normal, out var user))
        {
            return Unauthorized();
        }
        
        if (user == null)
        {
            return StatusCode(500);
        }

        var users = AppUserController.Instance.GetAll();
        return Ok(users);
    }
    
    [HttpPost]
    [Route("login")]
    public ActionResult<LoginResult?> Login([FromBody] LoginRequest req)
    {
        if (string.IsNullOrEmpty(req.Name) || string.IsNullOrEmpty(req.Password))
        {
            return BadRequest();
        }

        if (!AppUserController.Instance.VerifyLogin(req.Name, req.Password, out var user, out var session))
        {
            return Unauthorized();
        }

        if (user == null || session == null)
        {
            return StatusCode(500);
        }

        ApiAuthUtils.SetSessionCookie(Response, new ApiSessionData()
        {
            Uuid = user.Uuid,
            SessionToken = session.SessionToken
        });
        
        Logger.Debug($"{user.Name} ({Request.HttpContext.Connection.RemoteIpAddress}) logged in ({session.SessionToken[..8]}...)");
        
        return Ok(new LoginResult()
        {
            Code = 200,
            Uuid = user.Uuid,
            SessionToken = session.SessionToken
        });
    }

    [HttpPost]
    [Route("logout")]
    public ActionResult Logout()
    {
        if (!ApiAuthUtils.TryAuth(Request, Response, null, AppUserGroup.Default, out var user))
        {
            return Unauthorized();
        }

        if (!ApiAuthUtils.TryGetSessionCookie(Request, out var sessionData))
        {
            return BadRequest();
        }
        
        if (user == null)
        {
            return StatusCode(500);
        }
        
        if (!user.RemoveSessionToken(sessionData!.SessionToken)) 
            return StatusCode(500);
        
        AppUserController.Instance.UpdateOneComplete(user);
        ApiAuthUtils.DeleteSessionCookie(Response);
        
        Logger.Debug($"{user.Name} ({Request.HttpContext.Connection.RemoteIpAddress}) logged out ({sessionData.SessionToken[..8]}...)");
        
        return Ok();

    }
    
    [HttpPut]
    [Route("create")]
    public ActionResult Create(string? apiToken, [FromBody] UserCreateRequest req)
    {
        if (!ApiAuthUtils.TryAuth(Request, Response, apiToken, AppUserGroup.Privileged, out var user))
        {
            return Unauthorized();
        }

        var newUser = req.ToAppUser();
        
        if (!AppUserController.Instance.InsertOne(newUser)) return StatusCode(500);
        
        newUser = AppUserController.Instance.GetByUuid(newUser.Uuid);
        
        Logger.Debug($"{user!.Name} ({Request.HttpContext.Connection.RemoteIpAddress}) created new user {newUser.Name} ({newUser.Id})");
        
        return Ok(newUser);
    }

    [HttpDelete]
    [Route("delete")]
    public ActionResult Delete(string uuid, string? apiToken)
    {
        if (!ApiAuthUtils.TryAuth(Request, Response, apiToken, AppUserGroup.Privileged, out var user))
        {
            return Unauthorized();
        }
        
        if (!AppUserController.Instance.TryGetByUuid(uuid, out var userToDelete))
        {
            return NotFound();
        }
        
        if (userToDelete.UserGroup >= user!.UserGroup)
        {
            return Forbid();
        }
        
        Logger.Debug($"{user.Name} ({Request.HttpContext.Connection.RemoteIpAddress}) deleted user {userToDelete.Name} ({userToDelete.Id})");
        return AppUserController.Instance.DeleteOne(uuid) ? Ok() : StatusCode(500);
    }

    [HttpPost]
    [Route("update")]
    public ActionResult Update(string? apiToken, [FromBody] UserUpdateRequest updateRequest)
    {
        if (!ApiAuthUtils.TryAuth(Request, Response, apiToken, AppUserGroup.Normal, out var user))
        {
            return Unauthorized();
        }

        if (user == null)
        {
            return StatusCode(500);
        }
        
        if (user.Uuid == updateRequest.Uuid)
        {
            updateRequest.ApplyUpdate(user);
            AppUserController.Instance.UpdateOneComplete(user);
            Logger.Debug($"{user.Name} ({Request.HttpContext.Connection.RemoteIpAddress}) updated own user data");
            return Ok(user);
        }
        
        if (!AppUserController.Instance.TryGetByUuid(updateRequest.Uuid, out var userToUpdate))
        {
            return NotFound();
        }

        if (userToUpdate.UserGroup >= user.UserGroup)
        {
            return Forbid();
        }
        
        updateRequest.ApplyUpdate(userToUpdate);
        AppUserController.Instance.UpdateOneComplete(userToUpdate);
        
        Logger.Debug($"{user.Name} ({Request.HttpContext.Connection.RemoteIpAddress}) updated user data of {userToUpdate.Name} ({userToUpdate.Id})");
        
        return Ok(userToUpdate);
    }
    
    public class LoginRequest
    {
        public string Name { get; set; }
        public string Password { get; set; }
    }
    
    public class UserUpdateRequest
    {
        public string Uuid { get; set; }
        public string Name { get; set; }
        public string DisplayName { get; set; }
        
        public void ApplyUpdate(AppUser user)
        {
            user.Name = Name;
            user.DisplayName = DisplayName;
        }
    }
    
    public class UserCreateRequest
    {
        public string Name { get; set; }
        public string DisplayName { get; set; }
        public string Password { get; set; }
        public AppUserGroup UserGroup { get; set; }
        public AppUser ToAppUser()
        {
            return new AppUser(Name, DisplayName, Password, UserGroup);
        }
    }
    
    public class LoginResult
    {
        public int Code { get; set; }
        public string Uuid { get; set; }
        public string SessionToken { get; set; }
    }
    
}