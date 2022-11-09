using Newtonsoft.Json;

namespace WebAPI.Challonge
{
    public class ChallongeParticipant
    {
        public int Id { get; set; }
        [JsonProperty("tournament_id")]
        public int TournamentId { get; set; }
        public string Name { get; set; }
    }
}