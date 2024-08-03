import OverlayType from "./OverlayType.ts";
import TourneyGameVersion from "../tourney/TourneyGameVersion.ts";
import TourneyMatch from "../tourney/TourneyMatch.ts";
import TourneyTeamRef from "../tourney/team/TourneyTeamRef.ts";
import Localization from "../Localization.tsx";
import AppUserRef from "../user/AppUserRef.ts";

export default interface Overlay {
    uuid:string
    title:string
    scheduledTime:string
    type:OverlayType
    gameVersion:TourneyGameVersion
    maxMatches:number
    matches:TourneyMatch[]
    teamAlpha:TourneyTeamRef
    teamBeta:TourneyTeamRef
    localization:Localization
    commentators:AppUserRef[]
    successorOverlays:string[]
}