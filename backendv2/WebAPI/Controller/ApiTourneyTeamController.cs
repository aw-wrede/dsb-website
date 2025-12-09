using Commons.Utils;
using Core.Data.Casting.TourneyTeam;
using Core.Data.User;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using WebAPI.Utils;

namespace WebAPI.Controller;

[ApiController]
[Route("api/team")]
public class ApiTourneyTeamController : ControllerBase
{
    [HttpGet]
    [Route("{uuid}")]
    public ActionResult<TourneyTeam> Get(string? apiToken, [FromRoute] string uuid)
    {
        if (!ApiAuthUtils.TryAuth(Request, Response, apiToken, AppUserGroup.Default, out var user))
        {
            return Unauthorized();
        }

        if (!TourneyTeamController.Instance.TryGetByUuid(uuid, out var team))
        {
            return NotFound();
        }

        return Ok(team);
    }
    
    [HttpGet]
    [Route("getall")]
    public ActionResult GetAll(string? apiToken)
    {
        if (!ApiAuthUtils.TryAuth(Request, Response, apiToken, AppUserGroup.Default, out var user))
        {
            return Unauthorized();
        }

        var teams = TourneyTeamController.Instance.GetAll();
        return Ok(teams);
    }
    
    [HttpPost]
    [Route("update")]
    public ActionResult Update(string? apiToken, [FromBody] TeamRequest request)
    {
        if (string.IsNullOrEmpty(request.Uuid))
        {
            return BadRequest();
        }
        
        if (!ApiAuthUtils.TryAuth(Request, Response, apiToken, AppUserGroup.Privileged, out var user))
        {
            return Unauthorized();
        }

        if (!TourneyTeamController.Instance.TryGetByUuid(request.Uuid, out var team))
        {
            return NotFound();
        }

        if (!team.TryUpdate(request.Name, new List<string>(request.Members)))
        {
            return StatusCode(500);
        }

        return Ok(team);
    }
    
    [HttpPut]
    [Route("create")]
    public ActionResult Create(string?  apiToken, [FromBody] TeamRequest request)
    {
        
        if (!ApiAuthUtils.TryAuth(Request, Response, apiToken, AppUserGroup.Privileged, out var user))
        {
            return Unauthorized();
        }

        if (TourneyTeamController.Instance.Collection.FindSync(t => t.Name == request.Name).FirstOrDefault() != null)
        {
            return Conflict("team with same name already exists.");
        }
        
        var team = request.ToTourneyTeam();

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
    public ActionResult Delete(string uuid, string? apiToken)
    {
        if (string.IsNullOrEmpty(uuid))
        {
            return BadRequest();
        }

        if (!ApiAuthUtils.TryAuth(Request, Response, apiToken, AppUserGroup.Privileged, out var user))
        {
            return Unauthorized();
        }

        if (TourneyTeamController.Instance.TryGetByUuid(uuid, out _))
        {
            return TourneyTeamController.Instance.DeleteOne(uuid) ? Ok() : StatusCode(500);
        }

        return NotFound();
    }
    
    public class TeamRequest
    {
        public string? Uuid { get; set; }
        public string Name { get; set; }
        public string[] Members { get; set; }

        public TourneyTeam ToTourneyTeam()
        {
            return new TourneyTeam()
            {
                Name = Name,
                Members = new List<string>(Members),
            };
        }
    }
}