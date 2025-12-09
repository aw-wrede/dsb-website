using System.Text.Json.Serialization;
using Core.Controller;
using MongoDB.Bson.Serialization.Attributes;

namespace Core.Data.UploadedFile;

public class UploadedFileReference : IMapped
{
    [JsonIgnore]
    public long ReferenceId { get; set; }

    [BsonIgnore]
    public UploadedFile? Reference
    {
        get
        {
            return _reference ??= GetReference();
        }
    }

    private UploadedFile? _reference;

    private UploadedFile? GetReference()
    {
        return UploadedFileController.Instance.GetByIdOrDefault(ReferenceId, null!);
    }
}