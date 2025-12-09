using MongoDB.Driver;

namespace Core.Controller;

public abstract class PublicDataDatabaseController<TController, T> : DatabaseController<TController, T>
    where T : class, IPublicIdentified where TController : DatabaseController<TController, T>
{
    public bool TryGetByUuid(string uuid, out T t)
    {
        t = Collection.FindSync(x => x.Uuid == uuid).FirstOrDefault();
        return t != null;
    }

    public T GetByUuid(string uuid)
    {
        return Collection.FindSync(x => x.Uuid == uuid).FirstOrDefault();
    }

    public bool DeleteOne(string uuid)
    {
        return Collection.DeleteOne(t => t.Uuid == uuid).DeletedCount == 1;
    }
    
}