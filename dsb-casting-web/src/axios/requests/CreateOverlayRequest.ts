import OverlayType from "../../interfaces/overlay/OverlayType.ts";
import TourneyGameVersion from "../../interfaces/tourney/TourneyGameVersion.ts";
import TourneyMatch from "../../interfaces/tourney/TourneyMatch.ts";
import Localization from "../../interfaces/Localization.tsx";
import Overlay from "../../interfaces/overlay/Overlay.ts";
import AppUserRef from "../../interfaces/user/AppUserRef.ts";

export default interface CreateOverlayRequest {
    uuid?:string
    title:string
    type:OverlayType
    gameVersion:TourneyGameVersion
    maxMatches:number
    matches:TourneyMatch[]
    teamAlpha:string
    teamBeta:string
    localization:Localization
    commentators:string[]
}

function commentatorsToUuidList(list:AppUserRef[]):Array<string> {
    const result:string[] = []
    list.forEach(c => {
        result.push(c.reference.uuid)
    })

    return result
}

export function createOverlayRequestFromOverlay(overlay:Overlay):CreateOverlayRequest {
    return {
        uuid: overlay.uuid,
        title: overlay.title,
        type: overlay.type,
        gameVersion: overlay.gameVersion,
        maxMatches: overlay.maxMatches,
        matches: overlay.matches,
        teamAlpha: overlay.teamAlpha.reference.uuid,
        teamBeta: overlay.teamBeta.reference.uuid,
        localization: overlay.localization,
        commentators: commentatorsToUuidList(overlay.commentators)
    }
}