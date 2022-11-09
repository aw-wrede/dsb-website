using Newtonsoft.Json;

namespace WebAPI.Challonge
{
    public class ChallongeMatch
    {
        public int Id { get; set; }
        [JsonProperty("tournament_id")]
        public int TournamentId { get; set; }
        public string Name { get; set; }
        [JsonProperty("player1_id")]
        public int Participant1Id { get; set; }
        [JsonProperty("player2_id")]
        public int Participant2Id { get; set; }
        [JsonProperty("scores_csv")]
        public string Score { get; set; }
    }
}