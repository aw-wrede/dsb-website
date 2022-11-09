using System;
using System.Collections.Generic;
using System.Linq;
using Core.Data.Participant;
using Core.Data.Tournament;

namespace WebAPI.Controllers.Models.Result
{
    public class SeasonDataResult
    {
        public string Uuid { get; set; }
        public string Name { get; set; }
        public bool IsGroup { get; set; }
        public int GroupsAmount { get; set; } = -1;
        public string PublicUrl { get; set; }
        public List<ParticipantResult> Participants { get; set; } = new List<ParticipantResult>();
        public List<MatchResult> Matches { get; set; } = new List<MatchResult>();
        
        public List<List<int>> GroupsParticipantIds { get; set; }
        public List<List<ParticipantResult>> GroupParticipants { get; set; } = new List<List<ParticipantResult>>();

        public SeasonDataResult() {}

        public SeasonDataResult(Tournament tournament)
        {
            Uuid = tournament.Uuid;
            Name = tournament.Name;
            IsGroup = tournament.IsGroup;
            GroupsAmount = tournament.GroupAmount;
            GroupsParticipantIds = tournament.Groups;
            PublicUrl = tournament.PublicUrl;
            foreach (var participant in tournament.Participants)
            {
                Participants.Add(new ParticipantResult()
                {
                    Id = participant.ChallongeId,
                    GroupIds = participant.GroupIds,
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
                p.GroupIds.ForEach(x => wins.Add(x, 0));
                
                played.Add(p.Id, 0);
                p.GroupIds.ForEach(x => played.Add(x, 0));
                
                points.Add(p.Id, 0);
                p.GroupIds.ForEach(x => points.Add(x, 0));
                
                roundsLost.Add(p.Id, 0);
                p.GroupIds.ForEach(x => roundsLost.Add(x, 0));
                
                difference.Add(p.Id, 0);
                p.GroupIds.ForEach(x => difference.Add(x, 0));
                
            });
            
            //get wins
            Matches.ForEach(m =>
            {
                //if (!played.ContainsKey(m.Participant1Id) || !played.ContainsKey(m.Participant2Id)) return;
                played[m.Participant1Id] += 1;
                played[m.Participant2Id] += 1;
                
                points[m.Participant1Id] += m.Score1;
                points[m.Participant2Id] += m.Score2;

                roundsLost[m.Participant1Id] += m.Score2 > 0 ? m.Score2 : 0;
                roundsLost[m.Participant2Id] += m.Score1 > 0 ? m.Score1 : 0;
                
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
            if (IsGroup)
            {
                var gParticipantList = new List<ParticipantResult>();
                Participants.ForEach(p =>
                {
                    p.GroupIds.ForEach(groupId =>
                    {
                        var gParticipant = new ParticipantResult()
                        {
                            Id = p.Id,
                            GroupId = groupId,
                            Name = p.Name,
                            Wins = wins[groupId],
                            MatchesPlayed = played[groupId],
                            RoundsWon = points[groupId],
                            RoundsLost = roundsLost[groupId],
                        };
                        difference[groupId] = gParticipant.Wins - gParticipant.RoundsLost;
                        gParticipantList.Add(gParticipant);
                    });
                });
                
                GroupsParticipantIds.ForEach(group =>
                {
                    var groupList = new List<ParticipantResult>();
                    group.ForEach(pId =>
                    {
                        //add each participant that is in the group to the group
                        groupList.Add(gParticipantList.First(x => x.Id == pId));
                    });
                    
                    SortParticipants(groupList);
                    GroupParticipants.Add(groupList);
                });
            }
            
            SortParticipants(Participants);
        }

        private void SortParticipants(List<ParticipantResult> list)
        {
            var quotient = new Dictionary<int, double>();
            list.ForEach(p =>
            {
                var q = p.MatchesPlayed == 0 ? 0 : (double)p.Wins / (double)p.MatchesPlayed;
                if (p.Wins == -1) //if team dropped, set to -1
                {
                    q = -1;
                }

                if (q == 0)
                {
                    q = -p.MatchesPlayed;
                }
                
                quotient.Add(p.Id, q);
            });

            //var sortedDic = from entry in quotient orderby entry.Value ascending select entry;

            list.Sort(delegate(ParticipantResult p1, ParticipantResult p2)
            {
                if (Math.Abs(quotient[p2.Id] - quotient[p1.Id]) > 0.0) //if wins are not equal
                    return quotient[p2.Id].CompareTo(quotient[p1.Id]); //use wins to compare
                
                if(p1.RoundsWon != p2.RoundsWon)                 //if points are not equal
                    return p2.RoundsWon.CompareTo(p1.RoundsWon); //use points to compare

                return p2.Difference.CompareTo(p1.Difference); //use difference to compare if everything else is equal
            });
        }
    }
}