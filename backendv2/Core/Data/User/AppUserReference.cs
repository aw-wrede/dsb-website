using System.Text.Json.Serialization;
using Core.Controller;

namespace Core.Data.User;

public class AppUserReference : IMapped
{
    [JsonIgnore]
    public long ReferenceId { get; set; }

    public AppUser? Reference
    {
        get
        {
            return _reference ??= GetReference();
        }
        private set
        {
            if (value != null) _reference = value;
        }
    }

    public AppUserGroup? GetGroup()
    {
        return Reference?.UserGroup;
    }
    
    
    private AppUser? _reference;
    
    private AppUser? GetReference()
    {
        return AppUserController.Instance.TryGetById(ReferenceId, out var user) ? user : null;
    }
}