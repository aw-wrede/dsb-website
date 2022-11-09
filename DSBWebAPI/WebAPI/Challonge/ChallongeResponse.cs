using Commons.Utils;
using Core.Data.Tournament;

namespace WebAPI.Challonge
{
    public class ChallongeResponse
    {
        public ChallongeTournament Tournament { get; set; }
        
        public Tournament ToDatabaseFormat()
        {
            return new Tournament()
            {
                ChallongeId = Tournament.Id,
                Name = Tournament.Name,
                PublicUrl = Tournament.Url,
                Uuid = UuidGenerator.GenerateUuid(),
                Matches = Tournament.MatchesToDatabaseFormat(),
                Participants = Tournament.ParticipantsToDatabaseFormat()
            };
        }
        
    }
}