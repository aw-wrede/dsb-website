import TourneyTeamType from "./team/TourneyTeamType.ts";
import TourneyModeType from "./TourneyModeType.ts";
import TourneyMapType from "./TourneyMapType.ts";

export default interface TourneyMatch {
    winnerTeam:TourneyTeamType
    mapType:TourneyMapType
    modeType:TourneyModeType
}