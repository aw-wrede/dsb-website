using System.Linq;
using System.Text.RegularExpressions;

namespace WebAPI.Challonge
{
    public class ChallongeMatchResponse
    {
        public ChallongeMatch Match { get; set; }
        
        public Core.Data.Match.Match ToDatabaseFormat()
        {
            
            var numbers1 = Regex.Matches(Match.Score, @"^-?\d+")
                //.Cast<Match>()
                .Select(m => m.Value)
                .ToList();
            
            var numbers2 = Regex.Matches(Match.Score.Replace($"{numbers1[0]}-", ""), @"^-?\d+")
                .Select(m => m.Value)
                .ToList();
            
            //Logger.Debug($"Score: {numbers1[0]} - {numbers2[0]}");
            
            return new Core.Data.Match.Match
            {
                ChallongeId = Match.Id,
                Participant1Id = Match.Participant1Id,
                Participant2Id = Match.Participant2Id,
                ScoreParticipant1 = int.Parse(numbers1[0]),
                ScoreParticipant2 = int.Parse(numbers2[0])
            };
        }
        
    }
}