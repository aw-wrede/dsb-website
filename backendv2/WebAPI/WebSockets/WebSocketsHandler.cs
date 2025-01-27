using System.Net.WebSockets;
using Commons;
using Core.Data.User;

namespace WebAPI.WebSockets;

public class WebSocketsHandler
{
    protected WebSocket _webSocket;
    public AppUser User { get; set; }
    
    public WebSocketsHandler(WebSocket webSocket, AppUser user)
    {
        _webSocket = webSocket;
        User = user;
    }
    
    public async void Send(string message)
    {
        var bytes = System.Text.Encoding.UTF8.GetBytes(message);
        try
        {
            await _webSocket.SendAsync(
                new ArraySegment<byte>(bytes), WebSocketMessageType.Text, WebSocketMessageFlags.EndOfMessage,
                CancellationToken.None);
        }
        catch (Exception e)
        {
            Logger.Exception(e);
        }
    }
    
    private void HandleMessage(string message) {}
    
}