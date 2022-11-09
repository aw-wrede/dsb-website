using System;
using System.Collections.Generic;
using Commons;
using Core.Data.Tournament;

namespace WebAPI.Controllers.Models.Result
{
    public class SeasonDataResult
    {
        public string Uuid { get; set; }
        public string Name { get; set; }
        public string PublicUrl { get; set; }
        public List<ParticipantResult> Participants { get; set; } = new List<ParticipantResult>();
        public List<MatchResult> Matches { get; set; } = new List<MatchResult>();

        public SeasonDataResult() {}

        public SeasonDataResult(Tournament tournament)
        {
            Uuid = tournament.Uuid;
            Name = tournament.Name;
            PublicUrl = tournament.PublicUrl;
            foreach (var participant in tournament.Participants)
            {
                Participants.Add(new ParticipantResult()
                {
                    Id = participant.ChallongeId,
                    Name = participant.Name
                });
            }

            foreach (var match in tournament.Matches)
            {
                Matches.Add(new MatchResult(match));
            }
        }
        
        public void OrderParticipants()
        {
            var wins = new Dictionary<int, int>();
            var played = new Dictionary<int, int>();
            var points = new Dictionary<int, int>();
            var roundsLost = new Dictionary<int, int>();
            var difference = new Dictionary<int, int>();
            
            Participants.ForEach(p =>
            {
                wins.Add(p.Id, 0);
                played.Add(p.Id, 0);
                points.Add(p.Id, 0);
                roundsLost.Add(p.Id, 0);
                difference.Add(p.Id, 0);
            });
            
            //get wins
            Matches.ForEach(m =>
            {
                played[m.Participant1Id] += 1;
                played[m.Participant2Id] += 1;
                
                points[m.Participant1Id] += m.Score1;
                points[m.Participant2Id] += m.Score2;

                roundsLost[m.Participant1Id] += m.Score2;
                roundsLost[m.Participant2Id] += m.Score1;
                
                if (m.Score1 != m.Score2)
                {
                    if (m.Score1 > m.Score2)
                        wins[m.Participant1Id] += 1;
                    else
                        wins[m.Participant2Id] += 1;
                }
                else
                {
                    //TODO handle draw
                }
            });
            
            Participants.ForEach(p =>
            {
                p.Wins = wins[p.Id];
                p.MatchesPlayed = played[p.Id];
                p.RoundsWon = points[p.Id];
                p.RoundsLost = roundsLost[p.Id];

                difference[p.Id] = p.Wins - p.RoundsLost;
            });
            
            var quotient = new Dictionary<int, double>();
            Participants.ForEach(p =>
            {
                var q = (double)wins[p.Id] / (double)played[p.Id];
                quotient.Add(p.Id, q);
            });

            //var sortedDic = from entry in quotient orderby entry.Value ascending select entry;

            Participants.Sort(delegate(ParticipantResult p1, ParticipantResult p2)
            {
                if (Math.Abs(quotient[p2.Id] - quotient[p1.Id]) > 0.0) //if wins are not equal
                    return quotient[p2.Id].CompareTo(quotient[p1.Id]); //use wins to compare
                
                if(points[p1.Id] != points[p2.Id])                 //if points are not equal
                    return points[p2.Id].CompareTo(points[p1.Id]); //use points to compare

                return difference[p2.Id].CompareTo(difference[p1.Id]); //use difference to compare if everything else is equal
            });
        }
    }
}