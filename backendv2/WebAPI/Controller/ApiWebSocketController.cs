using Commons;
using Commons.Logging;
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
        if (!ApiAuthUtils.TryAuth(Request, Response, apiToken, AppUserGroup.Normal, out var user))
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
            Logger.Debug($"{user?.Name} ({Request.HttpContext.Connection.RemoteIpAddress}:{Request.HttpContext.Connection.RemotePort}) opened web socket for overlay data.");
            
            using var webSocket = await HttpContext.WebSockets.AcceptWebSocketAsync();
            var handler = new OverlayWebSocketHandler(webSocket, user!);
            ApiOverlayWebSocketController.Instance.Register(handler);
            
            await handler.Receive();
            ApiOverlayWebSocketController.Instance.Unregister(handler);
            
            Logger.Debug($"{user?.Name} ({Request.HttpContext.Connection.RemoteIpAddress}:{Request.HttpContext.Connection.RemotePort}) closed web socket for overlay data.");
        }
        catch (Exception e)
        {
            Logger.Exception(e);
        }
        
    }
}