using Core.Data.User;
using Microsoft.AspNetCore.Mvc;

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

    public class LoginRequest
    {
        public string Name { get; set; }
        public string Password { get; set; }
    }
    public class LoginResult
    {
        public int Code { get; set; }
        public string SessionToken { get; set; }
    }
    
}