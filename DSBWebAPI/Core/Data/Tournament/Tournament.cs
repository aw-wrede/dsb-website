using System.Collections.Generic;
using System.Linq;
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

    }

}