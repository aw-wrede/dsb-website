using Commons;
using MongoDB.Driver;

namespace Core.Controller;

public abstract class DatabaseController<TController, T> : IdentifiedController<TController, T>
    where T : class, IIdentified where TController : DatabaseController<TController, T>
{
        
    public IMongoCollection<T> Collection => BackendServer.Instance.Database.GetCollection<T>(typeof(T).Name);

    public bool TryGetById(long id, out T t)
    {
        t = Collection.FindSync(x => x.Id.Equals(id)).FirstOrDefault();
        return t != null;
    }

    public T GetByIdOrDefault(long id, T defaultVal)
    {
        return TryGetById(id, out var val) ? val : defaultVal;
    }

    public bool InsertOne(T t)
    {
        try
        {
            Collection.InsertOne(t);
            return true;
        }
        catch (Exception e)
        {
            Logger.Exception(e);
            return false;
        }
    }
        
    public bool UpdateOneComplete(T t)
    {
        return Collection.ReplaceOne(x => x.Id.Equals(t.Id), t).ModifiedCount > 0;
    }
        
    public override void OnStartup()
    {
        Logger.Info($"Starting up {GetType().Name}");
        base.OnStartup();

        Collection.FindSync(entity => true).ToList(). //ensure all structures in db are up-to-date DEPRECATED!
            ForEach(entity => Collection.ReplaceOne(found => found.Id == entity.Id, entity));
    }
}