using Core.Controller;
using Core.Data.User;

namespace WebAPI.WebSockets;

public class ApiWebSocketController<TController, T, TData> : Singleton<TController> where TController : ApiWebSocketController<TController, T, TData> where T : WebSocketsHandler
{
    protected readonly List<T> _handlers = [];
    
    protected ApiWebSocketController() {}

    public void Register(T t)
    {
        _handlers.Add(t);
    }

    public void Unregister(T t)
    {
        _handlers.Remove(t);
    }

    public virtual void UpdateAppUser(AppUser user) {}
    public virtual void Update(TData t) {}

}