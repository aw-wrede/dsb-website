using System.Text.Json;
using Core.Data.Casting.Overlay;
using Core.Data.User;

namespace WebAPI.WebSockets;

public class ApiOverlayWebSocketController : ApiWebSocketController<ApiOverlayWebSocketController, OverlayWebSocketHandler, Overlay>
{
    protected ApiOverlayWebSocketController() {}

    public override void UpdateAppUser(AppUser user)
    {
        _handlers.ForEach(handler =>
        {
            if (handler.User.Id != user.Id) return;
            
            handler.User = user;
            if (user.SelectedOverlay?.Reference != null)
            {
                SendOverlay(handler, user.SelectedOverlay.Reference);
            }
        });
    }
    
    public override void Update(Overlay t)
    {
        _handlers.ForEach(handler =>
        {
            if (handler.User.SelectedOverlay?.ReferenceId == t.Id)
            {
                SendOverlay(handler, t);
            }
            
        });
    }

    private void SendOverlay(WebSocketsHandler handler, Overlay overlay)
    {
        var options = new JsonSerializerOptions()
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            WriteIndented = true
        };
        handler.Send(JsonSerializer.Serialize(overlay, options));
    }
}