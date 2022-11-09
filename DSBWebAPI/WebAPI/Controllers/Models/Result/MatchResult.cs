using Core.Data.Match;

namespace WebAPI.Controllers.Models.Result
{
    public class MatchResult
    {
        public int Id { get; set; }
        public int Participant1Id { get; set; }
        public int Participant2Id { get; set; }
        public int Score1 { get; set; }
        public int Score2 { get; set; }
        
        public MatchResult() {}

        public MatchResult(Match match)
        {
            Id = match.ChallongeId;
            Participant1Id = match.Participant1Id;
            Participant2Id = match.Participant2Id;
            Score1 = match.ScoreParticipant1;
            Score2 = match.ScoreParticipant2;
        }
    }
}