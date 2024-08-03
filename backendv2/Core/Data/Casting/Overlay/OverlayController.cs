using Core.Controller;

namespace Core.Data.Casting.Overlay;

public class OverlayController : PublicDataDatabaseController<OverlayController, Overlay>
{
    protected OverlayController() {}

    public OverlayReference GetReference(Overlay overlay)
    {
        return new OverlayReference()
        {
            ReferenceId = overlay.Id
        };
    }

    public OverlayReference? GetReference(string uuid)
    {
        return TryGetByUuid(uuid, out var overlay) ? GetReference(overlay) : null;
    }
    
    public LinkedList<OverlayReference>? GetReferences(string[] uuids)
    {
        var list = new LinkedList<OverlayReference>();
        foreach (var uuid in uuids)
        {
            var reference = GetReference(uuid);
            if (reference == null)
            {
                return null;
            }
            list.AddLast(reference);
        }

        return list;
    }
}