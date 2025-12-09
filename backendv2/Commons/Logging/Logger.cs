namespace Commons.Logging;

public static class Logger
{
    private static readonly object Lock = new();
        
    private static readonly List<Action<LogLevel, string, Exception?>> LoggerActions = [];

    #region Callbacks

    public static void RegisterCallback(Action<LogLevel, string, Exception?> callback)
    {
        LoggerActions.Add(callback);
    }

    public static void UnregisterCallback(Action<LogLevel, string, Exception?> callback)
    {
        LoggerActions.Remove(callback);
    }

    private static void Dispatch(LogLevel logLevel, string logMessage, Exception? exception)
    {
        foreach (var action in LoggerActions)
        {
            try
            {
                action(logLevel, logMessage, exception);
            }
            catch (Exception)
            {
                // TODO Possibly handle errors but avoid error loops
            }
        }
    }

    #endregion

    #region Logging

    public static void Debug(string text)
    {
        lock (Lock)
        {
            Console.Write($"[{DateTime.Now.ToLongTimeString()}] ");
            Console.ForegroundColor = ConsoleColor.Gray;
            Console.WriteLine($"Debug: {text}");
            Console.ResetColor();
            
            Dispatch(LogLevel.Debug, text, null);
        }
    }
        
    public static void Info(string text)
    {
        lock (Lock)
        {
            Console.WriteLine($"[{DateTime.Now.ToLongTimeString()}] {text}");
            
            Dispatch(LogLevel.Information, text, null);
        }
    }

    public static void Warn(string text)
    {
        lock (Lock)
        {
            Console.Write($"[{DateTime.Now.ToLongTimeString()}] ");
            Console.ForegroundColor = ConsoleColor.Yellow;
            Console.WriteLine($"WARN: {text}");
            Console.ResetColor();
            
            Dispatch(LogLevel.Warning, text, null);
        }
    }

    public static void Error(string text)
    {
        lock (Lock)
        {
            Console.Write($"[{DateTime.Now.ToLongTimeString()}] ");
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine($"ERROR: {text}");
            Console.ResetColor();
            
            Dispatch(LogLevel.Error, text, null);
        }
    }

    public static void Exception(Exception e)
    {
        lock (Lock)
        {
            Console.Write($"[{DateTime.Now.ToLongTimeString()}] ");
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine(e);
            Console.ResetColor();
            
            Dispatch(LogLevel.Error, e.Message, e);
        }
    }

    #endregion
}