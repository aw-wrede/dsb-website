import OverlayTemplate from "../interfaces/overlay/OverlayTemplate.ts";
import CreateOverlayRequest from "../axios/requests/CreateOverlayRequest.ts";

export function applyOverlayTemplate(template:OverlayTemplate):CreateOverlayRequest {
    return {
        scheduledTime: new Date().toString(),
        successorOverlays: [],
        title: template.title,
        type: template.type,
        gameVersion:template.gameVersion,
        maxMatches:template.maxMatches,
        matches:template.matches,
        teamAlpha: "",
        teamBeta: "",
        localization:template.localization,
        commentators: []
    }
}

