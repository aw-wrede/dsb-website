using Commons.Utils;
using Core.Data.User;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Models;
using WebAPI.Utils;

namespace WebAPI.Controller;

[ApiController]
[Route("user")]
public class ApiAppUserController : ControllerBase
{
    
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

        return Ok(new LoginResult()
        {
            Code = 200,
            SessionToken = session.SessionToken
        });
    }

    [HttpPost]
    [Route("create")]
    public ActionResult Create([FromBody] UserCreateRequest req, [FromHeader] ApiSessionData sessionData)
    {
        if (!ApiAuthUtils.IsAuth(sessionData, accessLevel: AppUserGroup.Privileged, out _))
        {
            return Unauthorized();
        }

        var newUser = new AppUser(req.Name, req.DisplayName, req.Password);
        
        if (!AppUserController.Instance.InsertOne(newUser)) return StatusCode(500);
        
        newUser = AppUserController.Instance.GetByUuid(newUser.Uuid);
        return Ok(newUser);
    }

    [HttpDelete]
    [Route("delete")]
    public ActionResult Delete(string uuid, [FromHeader] ApiSessionData sessionData)
    {
        if (!ApiAuthUtils.IsAuth(sessionData, accessLevel: AppUserGroup.Privileged, out var user) || user == null)
        {
            return Unauthorized();
        }

        if (!AppUserController.Instance.TryGetByUuid(uuid, out var userToDelete))
        {
            return NotFound();
        }
        
        if (userToDelete.UserGroup >= user.UserGroup)
        {
            return Forbid();
        }
        
        return AppUserController.Instance.DeleteOne(uuid) ? Ok() : StatusCode(500);
    }
    
    public class LoginRequest
    {
        public string Name { get; set; }
        public string Password { get; set; }
    }
    
    public class UserCreateRequest
    {
        public string Name { get; set; }
        public string DisplayName { get; set; }
        public string Password { get; set; }
    }
    
    public class LoginResult
    {
        public int Code { get; set; }
        public string SessionToken { get; set; }
    }
    
}