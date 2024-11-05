import TourneyMap from "../interfaces/tourney/TourneyMap.ts";
import Localization from "../interfaces/Localization.tsx";
import TourneyMapType from "../interfaces/tourney/TourneyMapType.ts";
import TourneyGameVersion from "../interfaces/tourney/TourneyGameVersion.ts";
import TourneyMatch from "../interfaces/tourney/TourneyMatch.ts";
import TourneyTeamType from "../interfaces/tourney/team/TourneyTeamType.ts";
import TourneyModeType from "../interfaces/tourney/TourneyModeType.ts";

export function getMapFromType(mapData:Record<TourneyMapType, TourneyMap>, type:TourneyMapType):TourneyMap|null {
    return mapData != null ? mapData[type] : null
}

export function getMapNameLocalized(map:TourneyMap, localization:Localization) {
    if(map == null) return ""
    return map?.localizedNames[localization] ?? map?.localizedNames[Localization.English] ?? "???"
}

export function getUnknownMap():TourneyMap {
    return {
        name: "",
        gameVersion: TourneyGameVersion.Unknown,
        mapIdentifier: TourneyMapType.Unknown,
        image: "/maps/UnknownMap.webp",
        localizedNames: {
            1: ""
        }
    } as TourneyMap
}

export function getUnknownMatch():TourneyMatch {
    return {
        mapType: TourneyMapType.Unknown,
        winnerTeam: TourneyTeamType.Unknown,
        modeType: TourneyModeType.Unknown
    }
}