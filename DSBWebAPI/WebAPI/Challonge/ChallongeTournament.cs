using System.Collections.Generic;
using Core.Data.Match;
using Core.Data.Participant;
using Newtonsoft.Json;

namespace WebAPI.Challonge
{
    public class ChallongeTournament
    {
        public int Id { get; set; }
        public string Name { get; set; }
        [JsonProperty("group_stages_enabled")]
        public bool GroupsEnabled { get; set; }
        public string Url { get; set; }
        public List<ChallongeParticipantResponse> Participants { get; set; } = new List<ChallongeParticipantResponse>();
        public List<ChallongeMatchResponse> Matches { get; set; } = new List<ChallongeMatchResponse>();
        
        public string State { get; set; }
        
        public List<Match> MatchesToDatabaseFormat()
        {
            var list = new List<Match>();
            Matches.ForEach(match =>
            {
                if(match.Match.State == ChallongeMatch.StateComplete)
                    list.Add(match.ToDatabaseFormat());
            });
            return list;
        }
        
        public List<Participant> ParticipantsToDatabaseFormat()
        {
            var list = new List<Participant>();
            Participants.ForEach(participant => list.Add(participant.ToDatabaseFormat()));
            return list;
        }
    }
}