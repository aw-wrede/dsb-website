using System.Collections.Generic;

namespace Core.Data.Participant
{
    public class Participant
    {
        public int ChallongeId { get; set; }
        public string Name { get; set; }
        public List<int> GroupIds { get; set; } = new List<int>();
    }
}