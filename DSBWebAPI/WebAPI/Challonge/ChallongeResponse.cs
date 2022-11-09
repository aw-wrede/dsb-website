using System.Collections.Generic;
using Commons.Utils;
using Core.Data.Tournament;

namespace WebAPI.Challonge
{
    public class ChallongeResponse
    {
        public ChallongeTournament Tournament { get; set; }
        
        public Tournament ToDatabaseFormat()
        {
            var tournament = new Tournament()
            {
                ChallongeId = Tournament.Id,
                Name = Tournament.Name,
                PublicUrl = Tournament.Url,
                Uuid = UuidGenerator.GenerateUuid(),
                Matches = Tournament.MatchesToDatabaseFormat(),
                Participants = Tournament.ParticipantsToDatabaseFormat(),
                IsGroup = Tournament.GroupsEnabled
            };

            if (!tournament.IsGroup) return tournament;
            
            //if group size is not already defined, set to 2 by default
            if(tournament.GroupAmount == -1)
                tournament.GroupAmount = 2;

            int teamsPerGroup;
            var participantsAmount = tournament.Participants.Count;
            var currentParticipant = 0;
                
            //if not nice amount of teams per group, try to avoid errors
            if (tournament.Participants.Count % tournament.GroupAmount != 0)
            {
                teamsPerGroup = participantsAmount % tournament.GroupAmount + 1;
            }
            else
            {
                teamsPerGroup = participantsAmount / tournament.GroupAmount;
            }

            for (var i = 0; i < tournament.GroupAmount; i++)
            {
                var list = new List<int>();
                for (var j = 0; j < teamsPerGroup; j++)
                {
                    if(currentParticipant >= participantsAmount) break;
                    list.Add(tournament.Participants[currentParticipant].ChallongeId);
                    currentParticipant++;
                }
                tournament.Groups.Add(list);
            }

            return tournament;
        }
        
    }
}