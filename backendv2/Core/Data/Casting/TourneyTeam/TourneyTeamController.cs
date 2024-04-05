using Core.Controller;

namespace Core.Data.Casting.TourneyTeam;

public class TourneyTeamController : PublicDataDatabaseController<TourneyTeamController, TourneyTeam>
{
    protected TourneyTeamController() {}

    public override void OnStartup()
    {
        base.OnStartup();
    }
}