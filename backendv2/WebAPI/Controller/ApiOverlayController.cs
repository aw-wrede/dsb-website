using Commons.Localization;
using Commons.Utils;
using Core.Data.Casting;
using Core.Data.Casting.Overlay;
using Core.Data.Casting.TourneyMatch;
using Core.Data.Casting.TourneyTeam;
using Core.Data.User;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Utils;
using WebAPI.WebSockets;

namespace WebAPI.Controller;

[Route("api/overlay")]
public class ApiOverlayController : ControllerBase
{
    [HttpGet]
    [Route("{uuid}")]
    public ActionResult<Overlay[]> Get(string? apiToken, [FromRoute] string uuid)
    {
        if (!ApiAuthUtils.TryAuth(Request, Response, apiToken, AppUserGroup.Normal, out var user))
        {
            return Unauthorized();
        }

        if (!OverlayController.Instance.TryGetByUuid(uuid, out var overlay))
        {
            return NotFound();
        }

        return Ok(overlay);
    }

    [HttpGet]
    [Route("getall")]
    public ActionResult GetAll(string? apiToken)
    {
        if (!ApiAuthUtils.TryAuth(Request, Response, apiToken, AppUserGroup.Normal, out var user))
        {
            return Unauthorized();
        }

        var overlays = OverlayController.Instance.GetAll();
        return Ok(overlays);
    }
    
    [HttpGet]
    [Route("select/{uuid}")]
    public ActionResult Select(string? apiToken, [FromRoute] string uuid)
    {
        if (!ApiAuthUtils.TryAuth(Request, Response, apiToken, AppUserGroup.Normal, out var user))
        {
            return Unauthorized();
        }
        
        if (!OverlayController.Instance.TryGetByUuid(uuid, out var overlay))
        {
            return NotFound();
        }

        user!.SelectedOverlay = OverlayController.Instance.GetReference(overlay);
        AppUserController.Instance.UpdateOneComplete(user);
        
        ApiOverlayWebSocketController.Instance.UpdateAppUser(user);
        return Ok(uuid);
    }
    
    [HttpPut]
    [Route("add")]
    public ActionResult Add(string? apiToken, [FromBody] OverlayRequest request)
    {
        if (!ApiAuthUtils.TryAuth(Request, Response, apiToken, AppUserGroup.Normal, out var user))
        {
            return Unauthorized();
        }
        
        var overlay = request.ToOverlay();
        if (overlay == null)
        {
            return BadRequest();
        }

        overlay.Uuid = UuidGenerator.GenerateUuid();

        if (!OverlayController.Instance.InsertOne(overlay))
        {
            return StatusCode(500);
        }

        return Ok(overlay);
    }
    
    [HttpPost]
    [Route("update")]
    public ActionResult Update(string? apiToken, [FromBody] OverlayRequest request)
    {
        if (string.IsNullOrEmpty(request.Uuid))
        {
            return BadRequest();
        }
        
        if (!ApiAuthUtils.TryAuth(Request, Response, apiToken, AppUserGroup.Normal, out var user))
        {
            return Unauthorized();
        }

        if (!OverlayController.Instance.TryGetByUuid(request.Uuid, out var overlay))
        {
            return NotFound();
        }

        var updatedOverlay = request.ToOverlay();
        if (updatedOverlay == null)
        {
            return BadRequest();
        }

        updatedOverlay.Id = overlay.Id;
        updatedOverlay.Uuid = overlay.Uuid;

        OverlayController.Instance.UpdateOneComplete(updatedOverlay);
        
        ApiOverlayWebSocketController.Instance.Update(updatedOverlay);
        return Ok();
    }

    public class OverlayRequest
    {
        public string? Uuid { get; set; }
        public string Title { get; set; }
        public string ScheduledTime { get; set; }
        public OverlayType Type { get; set; }
        public int MaxMatches { get; set; }
        public TourneyMatch[] Matches { get; set; } = [];
        public string TeamAlpha { get; set; }
        public string TeamBeta { get; set; }
        public TourneyGameVersion GameVersion { get; set; }
        public Localization Localization { get; set; }
        public string[] Commentators { get; set; } = [];
        public string[] SuccessorOverlays { get; set; } = [];
        
        public Overlay? ToOverlay()
        {
            var teamAlphaReference = TourneyTeamController.Instance.GetReference(TeamAlpha);
            var teamBetaReference = TourneyTeamController.Instance.GetReference(TeamBeta);

            var commentatorReferences = AppUserController.Instance.GetReferences(Commentators);
            var successorReferences = OverlayController.Instance.GetReferences(SuccessorOverlays);
            
            if (teamAlphaReference == null || teamBetaReference == null || commentatorReferences == null || successorReferences == null)
            {
                return null;
            }
            
            return new Overlay()
            {
                Uuid = Uuid ?? "",
                Title = Title,
                ScheduledTime = DateTime.Parse(ScheduledTime),
                Type = Type,
                MaxMatches = MaxMatches,
                Matches = new LinkedList<TourneyMatch>(Matches),
                TeamAlphaReference = teamAlphaReference,
                TeamBetaReference = teamBetaReference,
                Localization = Localization,
                Commentators = commentatorReferences,
                SuccessorOverlays = successorReferences
            };
        }
    }
}