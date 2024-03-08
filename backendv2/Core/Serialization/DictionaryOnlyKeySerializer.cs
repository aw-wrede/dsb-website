using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Serializers;

namespace Core.Serialization;

public class DictionaryOnlyKeySerializer<TKey, TValue> : IBsonSerializer<Dictionary<TKey, TValue>>
{
    public void Serialize(BsonSerializationContext context, BsonSerializationArgs args, Dictionary<TKey, TValue> value)
    {
        new ArraySerializer<TKey>().Serialize(context, args, value.Keys.ToArray());
    }

    public Dictionary<TKey, TValue> Deserialize(BsonDeserializationContext context, BsonDeserializationArgs args)
    {
        var dictionary = new Dictionary<TKey, TValue>();

        var keys = new ArraySerializer<TKey>().Deserialize(context, args);
        keys.ToList().ForEach(k => dictionary.Add(k, default));

        return dictionary;
    }
        
    public void Serialize(BsonSerializationContext context, BsonSerializationArgs args, object value)
    {
        Serialize(context, args, (Dictionary<TKey, TValue>)value);
    }
        
    object IBsonSerializer.Deserialize(BsonDeserializationContext context, BsonDeserializationArgs args)
    {
        return Deserialize(context, args);
    }

    public Type ValueType => typeof(Dictionary<TKey, TValue>);
}