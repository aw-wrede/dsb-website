using System.Reflection;

namespace Core.Controller;

public abstract class Singleton<T> where T : Singleton<T>
{
    private static T _instance;

    public static T Instance
    {
        get
        {
            if (_instance != null) return _instance;
            var constructor = typeof(T).GetConstructor(BindingFlags.NonPublic | BindingFlags.Instance, null,
                new Type[0], null);
            _instance = (T) constructor?.Invoke(null);

            return _instance;
        }
    }
}