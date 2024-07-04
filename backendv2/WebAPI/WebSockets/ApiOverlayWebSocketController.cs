using System.Text.Json;
using Commons;
using Core.Data.Casting.Overlay;
using Core.Data.User;
using MongoDB.Bson;

namespace WebAPI.WebSockets;

public class ApiOverlayWebSocketController : ApiWebSocketController<ApiOverlayWebSocketController, OverlayWebSocketHandler, Overlay>
{
    protected ApiOverlayWebSocketController() {}

    public override void UpdateAppUser(AppUser user)
    {
        _handlers.ForEach(handler =>
        {
            if (handler.User.Id == user.Id)
            {
                handler.User = user;
            }
        });
    }
    
    public override void Update(Overlay t)
    {
        Logger.Debug("WebSocket Controller received overlay update");
        _handlers.ForEach(handler =>
        {
            if (handler.User.SelectedOverlay?.ReferenceId == t.Id)
            {
                Logger.Debug($"Sending update to {handler.User.Name}");
                handler.Send(JsonSerializer.Serialize(t));
            }
            else
            {
                Logger.Debug($"Ids don't match: {handler.User.SelectedOverlay?.ReferenceId} != {t.Id}");
            }
            
        });
    }
}