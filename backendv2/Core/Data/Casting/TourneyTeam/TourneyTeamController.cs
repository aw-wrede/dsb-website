using Core.Controller;

namespace Core.Data.Casting.TourneyTeam;

public class TourneyTeamController : PublicDataDatabaseController<TourneyTeamController, TourneyTeam>
{
    protected TourneyTeamController() {}

    public override void OnStartup()
    {
        base.OnStartup();
    }

    public TourneyTeamReference GetReference(TourneyTeam team)
    {
        return new TourneyTeamReference()
        {
            ReferenceId = team.Id
        };
    }

    public TourneyTeamReference? GetReference(string uuid)
    {
        return TryGetByUuid(uuid, out var team) ? GetReference(team) : null;
    }
    
}