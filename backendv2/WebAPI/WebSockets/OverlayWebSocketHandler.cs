using System.Net.WebSockets;
using System.Text.Json;
using Commons;
using Core.Data.User;

namespace WebAPI.WebSockets;

public class OverlayWebSocketHandler : WebSocketsHandler
{
    public OverlayWebSocketHandler(WebSocket webSocket, AppUser user) : base(webSocket, user)
    {
        // send initial overlay data
        var overlay = user.SelectedOverlay?.Reference;
        if (overlay != null)
        {
            var options = new JsonSerializerOptions()
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                WriteIndented = true
            };
            Send(JsonSerializer.Serialize(overlay, options));
        }
    }
    
    public async Task Receive()
    {
        var buffer = new byte[1024 * 4];
        var receiveResult = await _webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);

        while (!receiveResult.CloseStatus.HasValue)
        {
            // handle message
            var message = System.Text.Encoding.UTF8.GetString(
                new ArraySegment<byte>(buffer, 0, receiveResult.Count));
            
            Logger.Debug($"{User.Name}: {message}");
            
            receiveResult = await _webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
        }

        await _webSocket.CloseAsync(receiveResult.CloseStatus.Value,
            receiveResult.CloseStatusDescription,
            CancellationToken.None);
    }
    
}