using Core.Data.Casting.OverlayTemplate;
using Core.Data.User;
using Microsoft.AspNetCore.Mvc;
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
}