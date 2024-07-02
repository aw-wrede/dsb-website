using Commons;
using Commons.Localization;
using Commons.Utils;
using Core.Data.Casting.Overlay;
using Core.Data.Casting.OverlayTemplate;
using Core.Data.Casting.TourneyMatch;
using Core.Data.User;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using WebAPI.Utils;

namespace WebAPI.Controller;

[ApiController]
[Route("api/overlay/template")]
public class ApiOverlayTemplateController : ControllerBase
{
    [HttpGet]
    [Route("get/{uuid}")]
    public ActionResult<OverlayTemplate?> Get(string apiToken, [FromRoute] string uuid)
    {
        if (!ApiAuthUtils.IsAuth(apiToken, accessLevel: AppUserGroup.Normal, out _))
        {
            return Unauthorized();
        }

        if (!OverlayTemplateController.Instance.TryGetByUuid(uuid, out var template))
        {
            return NotFound();
        }

        return Ok(template);
    }

    [HttpDelete]
    [Route("delete")]
    public ActionResult Delete(string apiToken, [FromBody] string uuid)
    {
        if (!ApiAuthUtils.IsAuth(apiToken, accessLevel: AppUserGroup.Privileged, out _))
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
    public ActionResult Add(string apiToken, [FromBody] OverlayTemplateAddRequest request)
    {
        if (!ApiAuthUtils.IsAuth(apiToken, accessLevel: AppUserGroup.Privileged, out _))
        {
            return Unauthorized();
        }

        var template = request.ToTemplate();
        
        if (!OverlayTemplateController.Instance.InsertOne(template)) return StatusCode(500);
        
        template = OverlayTemplateController.Instance.GetByUuid(template.Uuid);
        return Ok(template);
    }
    
    public class OverlayTemplateAddRequest
    {
        public string Title { get; set; }
        public OverlayType OverlayType { get; set; }
        public int MaxMatches { get; set; }
        public TourneyMatch[] Matches { get; set; }
        public Localization Localization { get; set; }

        public OverlayTemplate ToTemplate()
        {
            return new OverlayTemplate()
            {
                Uuid = UuidGenerator.GenerateUuid(),
                Title = Title,
                Type = OverlayType,
                MaxMatches = MaxMatches,
                Matches = new LinkedList<TourneyMatch>(Matches),
                Localization = Localization
            };
        }
        
    }
    
}