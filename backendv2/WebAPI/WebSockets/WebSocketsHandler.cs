using System.Net.WebSockets;
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
    
    private void HandleMessage(string message) {}
    
}