using Core.Controller;
using Core.Data.Casting.TourneyMap;

namespace Core.Data.Casting.TourneyMatch;

public class TourneyMatch : IMapped
{
    public TourneyTeamType? WinnerTeam { get; set; }
    public TourneyMapType MapType { get; set; }
    public TourneyModeType ModeType { get; set; }
}