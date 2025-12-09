import OverlayType from "./OverlayType.ts";
import TourneyMatch from "../tourney/TourneyMatch.ts";
import TourneyGameVersion from "../tourney/TourneyGameVersion.ts";
import Localization from "../Localization.tsx";

export default interface OverlayTemplate {
    uuid: string
    title: string
    type: OverlayType
    gameVersion:TourneyGameVersion
    maxMatches: number
    matches: TourneyMatch[]
    localization:Localization
}