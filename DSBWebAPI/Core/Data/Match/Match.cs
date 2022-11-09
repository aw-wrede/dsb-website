namespace Core.Data.Match
{
    public class Match
    {
        public int ChallongeId { get; set; }
        public int Participant1Id { get; set; }
        public int Participant2Id { get; set; }
        
        public int ScoreParticipant1 { get; set; }
        public int ScoreParticipant2 { get; set; }
        
        public bool Forfeited { get; set; }
    }
}