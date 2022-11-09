using Core.Data.Participant;

namespace WebAPI.Challonge
{
    public class ChallongeParticipantResponse
    {
        public ChallongeParticipant Participant { get; set; }

        public Participant ToDatabaseFormat()
        {
            return new Participant
            {
                ChallongeId = Participant.Id,
                Name = Participant.Name
            };
        }
    }
}