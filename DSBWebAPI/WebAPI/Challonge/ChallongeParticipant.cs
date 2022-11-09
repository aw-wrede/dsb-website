using System.Collections.Generic;
using Newtonsoft.Json;

namespace WebAPI.Challonge
{
    public class ChallongeParticipant
    {
        public int Id { get; set; }
        [JsonProperty("tournament_id")]
        public int TournamentId { get; set; }
        public int Seed { get; set; }
        public string Name { get; set; }
        [JsonProperty("group_player_ids")]
        public List<int> GroupIds { get; set; } = new List<int>();
    }
}