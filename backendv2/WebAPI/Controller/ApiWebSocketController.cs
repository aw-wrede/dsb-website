using Commons;
using Core.Data.Casting.Overlay;
using Core.Data.User;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Utils;
using WebAPI.WebSockets;

namespace WebAPI.Controller;

public class ApiWebSocketController : ControllerBase
{
    [HttpGet]
    [Route("api/overlay/ws")]
    public async Task Open(string apiToken)
    {
        if (!ApiAuthUtils.IsAuth(apiToken, accessLevel: AppUserGroup.Normal, out var user))
        {
            HttpContext.Response.StatusCode = StatusCodes.Status401Unauthorized;
            return;
        }
        
        if (!HttpContext.WebSockets.IsWebSocketRequest)
        {
            HttpContext.Response.StatusCode = StatusCodes.Status400BadRequest;
            return;
        }

        try
        {
            using var webSocket = await HttpContext.WebSockets.AcceptWebSocketAsync();
            var handler = new OverlayWebSocketHandler(webSocket, user!);
            ApiOverlayWebSocketController.Instance.Register(handler);
            handler.Send("Test");
            await handler.Receive();
            ApiOverlayWebSocketController.Instance.Unregister(handler);
        }
        catch (Exception e)
        {
            Logger.Exception(e);
        }
        
    }
}