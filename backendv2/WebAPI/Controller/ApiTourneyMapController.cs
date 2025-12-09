using Commons;
using Core.Data.Casting.TourneyMap;
using Core.Data.User;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Utils;

namespace WebAPI.Controller;

[ApiController]
[Route("api/map")]
public class ApiTourneyMapController : ControllerBase
{
    [HttpGet]
    [Route("getall")]
    public ActionResult GetAll(string? apiToken)
    {
        if (!ApiAuthUtils.TryAuth(Request, Response, apiToken, AppUserGroup.Normal, out var user))
        {
            return Unauthorized();
        }

        var data = TourneyMapController.Instance.GetAll();
        return Ok(data);
    }
}