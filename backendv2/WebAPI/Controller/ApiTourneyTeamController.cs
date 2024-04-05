using Commons.Utils;
using Core.Data.Casting.TourneyTeam;
using Core.Data.User;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using WebAPI.Utils;

namespace WebAPI.Controller;

[ApiController]
[Route("api/team")]
public class ApiTourneyTeamController : ControllerBase
{
    [HttpPost]
    [Route("create")]
    public async Task<ActionResult> Create(string name, string members, [FromHeader] string apiToken)
    {
        if (string.IsNullOrEmpty(apiToken) || string.IsNullOrEmpty(name) || string.IsNullOrEmpty(members))
        {
            return BadRequest();
        }
        
        if (!ApiAuthUtils.IsAuth(apiToken, out var user))
        {
            return Unauthorized();
        }

        if (user.UserGroup < AppUserGroup.Privileged)
        {
            return Unauthorized();
        }
        
        var memberList = JsonConvert.DeserializeObject<string[]>(members);
        if (memberList == null)
        {
            return BadRequest("Could not parse members");
        }
        
        var team = new TourneyTeam()
        {
            Name = name,
            Uuid = UuidGenerator.GenerateUuid(),
            Members = memberList.ToList()
        };

        if (!TourneyTeamController.Instance.InsertOne(team))
        {
            return StatusCode(500);
        }

        if (!TourneyTeamController.Instance.TryGetByUuid(team.Uuid, out team))
        {
            return StatusCode(500);
        }

        return Ok(team);
    }
}