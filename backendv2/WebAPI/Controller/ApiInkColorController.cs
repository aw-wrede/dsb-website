using Commons;
using Core.Data.InkColor;
using Core.Data.User;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Utils;

namespace WebAPI.Controller;

[Route("api/color")]
public class ApiInkColorController : ControllerBase
{
    [HttpGet]
    [Route("getall")]
    public ActionResult<InkColorPair[]> GetAll(string? apiToken)
    {
        if (!ApiAuthUtils.TryAuth(Request, Response, apiToken, AppUserGroup.Guest, out var user))
        {
            return Unauthorized();
        }

        try
        {
            var list = InkColorPairController.Instance.GetAll();
            return Ok(list);
        }
        catch (Exception e)
        {
            Logger.Exception(e);
        }

        return Problem();
    }
}