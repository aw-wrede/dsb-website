using System.Collections.Generic;
using Core.Controller;
using Core.Serialization;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;

namespace Core.Data.Tournament
{
    public class Tournament : IPublicIdentified
    {
        [JsonIgnore]
        [BsonId(IdGenerator = typeof(BsonIncrementGenerator<Tournament>))]
        public long Id { get; set; }
        public int ChallongeId { get; set; }
        public string Uuid { get; set; }
        
        public string Name { get; set; }
        public string PublicUrl { get; set; }
        public List<Participant.Participant> Participants { get; set; } = new List<Participant.Participant>();
        public List<Match.Match> Matches { get; set; } = new List<Match.Match>();

        public bool IsGroup { get; set; } = false;
        public int GroupAmount { get; set; } = -1;
        public List<List<int>> Groups { get; set; } = new List<List<int>>();
        public bool ShouldUpdateGroupsData { get; set; } = true;
    }

}