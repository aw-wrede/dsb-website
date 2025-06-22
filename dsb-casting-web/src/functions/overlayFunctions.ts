import OverlayTemplate from "../interfaces/overlay/OverlayTemplate.ts";
import CreateOverlayRequest from "../axios/requests/CreateOverlayRequest.ts";
import Overlay from "../interfaces/overlay/Overlay.ts";
import TourneyTeamType from "../interfaces/tourney/team/TourneyTeamType.ts";
import TourneyModeType from "../interfaces/tourney/TourneyModeType.ts";
import {getBaseUrl} from "./functions.ts";

export function applyOverlayTemplate(overlay:CreateOverlayRequest, template:OverlayTemplate):CreateOverlayRequest {
    const newOverlay = Object.assign({}, overlay);

    newOverlay.title = template.title
    newOverlay.type = template.type
    newOverlay.gameVersion = template.gameVersion
    newOverlay.maxMatches = template.maxMatches
    newOverlay.matches = template.matches
    newOverlay.localization = template.localization

    return newOverlay
}

export function overlayGetTeamAlphaWins(overlay:Overlay|CreateOverlayRequest):number {
    return overlay.matches.filter(m => m.winnerTeam === TourneyTeamType.Alpha).length
}

export function overlayGetTeamBetaWins(overlay:Overlay|CreateOverlayRequest):number {
    return overlay.matches.filter(m => m.winnerTeam === TourneyTeamType.Beta).length
}

const modeIconBaseUrl = "/images/modes"

export function getModeIcon(mode:TourneyModeType):string {
    switch (mode) {
        case TourneyModeType.Turf:
            return `${modeIconBaseUrl}/TurfWar.webp`
        case TourneyModeType.SplatZones:
            return `${modeIconBaseUrl}/SplatZones.webp`
        case TourneyModeType.TowerControl:
            return `${modeIconBaseUrl}/TowerControl.webp`
        case TourneyModeType.Rainmaker:
            return `${modeIconBaseUrl}/Rainmaker.webp`
        case TourneyModeType.ClamBlitz:
            return `${modeIconBaseUrl}/ClamBlitz.webp`
    }
}

export function getStartupSiteUrl():string {
    return `${getBaseUrl()}/live/startup`
}

export function getLiveOverlaySiteUrl():string {
    return `${getBaseUrl()}/live/overview`
}

export function getLiveIngameSiteUrl():string {
    return `${getBaseUrl()}/live/ingame`
}