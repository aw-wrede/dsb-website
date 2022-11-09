using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace WebAPI.Controllers.Models.Result
{
    public class ParticipantResult
    {
        public int Id { get; set; }
        public int GroupId { get; set; } = -1;
        [JsonIgnore]
        public List<int> GroupIds { get; set; } = new List<int>();
        public string Name { get; set; }
        public int Wins { get; set; } = 0;
        public int MatchesPlayed { get; set; } = 0;
        public int RoundsWon { get; set; } = 0;
        public int RoundsLost { get; set; } = 0;
        public int Difference => RoundsWon - RoundsLost;
        
    }
}