using Commons.Localization;
using Commons.Utils;
using Core.Data.Casting;
using Core.Data.Casting.Overlay;
using Core.Data.Casting.OverlayTemplate;
using Core.Data.Casting.TourneyMatch;
using Core.Data.User;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Utils;

namespace WebAPI.Controller;

[ApiController]
[Route("api/overlay/template")]
public class ApiOverlayTemplateController : ControllerBase
{
    [HttpGet]
    [Route("{uuid}")]
    public ActionResult<OverlayTemplate?> Get(string? apiToken, [FromRoute] string uuid)
    {
        if (!ApiAuthUtils.TryAuth(Request, Response, apiToken, AppUserGroup.Normal, out var user))
        {
            return Unauthorized();
        }

        if (!OverlayTemplateController.Instance.TryGetByUuid(uuid, out var template))
        {
            return NotFound();
        }

        return Ok(template);
    }

    [HttpGet]
    [Route("getall")]
    public ActionResult<OverlayTemplate[]> GetAll(string? apiToken)
    {
        if (!ApiAuthUtils.TryAuth(Request, Response, apiToken, AppUserGroup.Normal, out var user))
        {
            return Unauthorized();
        }

        var templates = OverlayTemplateController.Instance.GetAll();
        return Ok(templates);
    }
    
    [HttpDelete]
    [Route("delete")]
    public ActionResult Delete(string? apiToken, [FromBody] string uuid)
    {
        if (!ApiAuthUtils.TryAuth(Request, Response, apiToken, AppUserGroup.Privileged, out var user))
        {
            return Unauthorized();
        }

        if (!OverlayTemplateController.Instance.TryGetByUuid(uuid, out var template))
        {
            return NotFound();
        }

        return OverlayTemplateController.Instance.DeleteOne(uuid) ? Ok() : StatusCode(500);
    }

    [HttpPut]
    [Route("add")]
    public ActionResult Add(string? apiToken, [FromBody] OverlayTemplateRequest request)
    {
        if (!ApiAuthUtils.TryAuth(Request, Response, apiToken, AppUserGroup.Privileged, out var user))
        {
            return Unauthorized();
        }

        // Ignores user defined uuid and lets backend create uuid
        request.Uuid = null;
        
        var template = request.ToTemplate();
        
        if (!OverlayTemplateController.Instance.InsertOne(template)) return StatusCode(500);
        
        template = OverlayTemplateController.Instance.GetByUuid(template.Uuid);
        return Ok(template);
    }

    [HttpPost]
    [Route("update")]
    public ActionResult Update(string? apiToken, [FromBody] OverlayTemplateRequest request)
    {
        if (string.IsNullOrEmpty(request.Uuid))
        {
            return BadRequest();
        }
        
        if (!ApiAuthUtils.TryAuth(Request, Response, apiToken, AppUserGroup.Normal, out var user))
        {
            return Unauthorized();
        }

        if (!OverlayTemplateController.Instance.TryGetByUuid(request.Uuid, out var template))
        {
            return NotFound();
        }
        
        var updatedTemplate = request.ToTemplate();
        updatedTemplate.Id = template.Id;
        updatedTemplate.Uuid = template.Uuid;

        OverlayTemplateController.Instance.UpdateOneComplete(updatedTemplate);
        return Ok();
    }
    
    public class OverlayTemplateRequest
    {
        public string? Uuid { get; set; }
        public string Title { get; set; }
        public OverlayType Type { get; set; }
        public TourneyGameVersion GameVersion { get; set; }
        public int MaxMatches { get; set; }
        public TourneyMatch[] Matches { get; set; }
        public Localization Localization { get; set; }

        public OverlayTemplate ToTemplate()
        {
            return new OverlayTemplate()
            {
                Uuid = Uuid ?? UuidGenerator.GenerateUuid(),
                Title = Title,
                Type = Type,
                GameVersion = GameVersion,
                MaxMatches = MaxMatches,
                Matches = new LinkedList<TourneyMatch>(Matches),
                Localization = Localization
            };
        }
        
    }
    
}