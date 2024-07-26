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
                handler.Send(JsonSerializer.Serialize(t));
            }
            
        });
    }

    private void SendOverlay(WebSocketsHandler handler, Overlay overlay)
    {
        handler.Send(JsonSerializer.Serialize(overlay));
    }
}