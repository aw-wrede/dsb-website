using Core.Controller;

namespace Core.Data.Tournament
{
    public class TournamentController : PublicDataDatabaseController<TournamentController, Tournament>
    {
        protected TournamentController() {}

        public override void OnStartup()
        {
            base.OnStartup();
        }
    }
}