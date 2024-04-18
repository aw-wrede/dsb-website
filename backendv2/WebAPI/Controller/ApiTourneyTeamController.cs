using Commons.Utils;
using Core.Data.Casting.TourneyTeam;
using Core.Data.User;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using WebAPI.Models;
using WebAPI.Utils;

namespace WebAPI.Controller;

[ApiController]
[Route("api/team")]
public class ApiTourneyTeamController : ControllerBase
{
    [HttpPost]
    [Route("update")]
    public ActionResult Update(string uuid, string name, string members, [FromHeader] ApiSessionData sessionData)
    {
        if (string.IsNullOrEmpty(uuid) || string.IsNullOrEmpty(name) || string.IsNullOrEmpty(members))
        {
            return BadRequest();
        }
        
        if (!ApiAuthUtils.IsAuth(sessionData, accessLevel: AppUserGroup.Privileged, out var user))
        {
            return Unauthorized();
        }

        var memberList = ParseMemberList(members);
        if (memberList == null)
        {
            return BadRequest("Could not parse members");
        }

        if (!TourneyTeamController.Instance.TryGetByUuid(uuid, out var team))
        {
            return NotFound();
        }

        if (!team.TryUpdate(name, memberList))
        {
            return StatusCode(500);
        }

        return Ok(team);
    }
    
    [HttpPut]
    [Route("create")]
    public ActionResult Create(string name, string members, [FromHeader] ApiSessionData sessionData)
    {
        if (string.IsNullOrEmpty(name) || string.IsNullOrEmpty(members))
        {
            return BadRequest();
        }
        
        if (!ApiAuthUtils.IsAuth(sessionData, accessLevel: AppUserGroup.Privileged, out var user))
        {
            return Unauthorized();
        }

        var memberList = ParseMemberList(members);
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

    [HttpDelete]
    [Route("delete")]
    public ActionResult Delete(string uuid, [FromHeader] ApiSessionData sessionData)
    {
        if (string.IsNullOrEmpty(uuid))
        {
            return BadRequest();
        }

        if (!ApiAuthUtils.IsAuth(sessionData, AppUserGroup.Privileged, out var user))
        {
            return Unauthorized();
        }

        if (TourneyTeamController.Instance.TryGetByUuid(uuid, out _))
        {
            return TourneyTeamController.Instance.DeleteOne(uuid) ? Ok() : StatusCode(500);
        }

        return NotFound();
    }
    
    private static List<string>? ParseMemberList(string input)
    {
        var memberList = JsonConvert.DeserializeObject<string[]>(input);
        return memberList?.ToList();
    }
}