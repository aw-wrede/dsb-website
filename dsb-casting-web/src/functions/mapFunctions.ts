import TourneyMap from "../interfaces/tourney/TourneyMap.ts";
import Localization from "../interfaces/Localization.tsx";
import TourneyMapType from "../interfaces/tourney/TourneyMapType.ts";

export function getMapFromType(mapData:Record<TourneyMapType, TourneyMap>, type:TourneyMapType):TourneyMap|null {
    return mapData != null ? mapData[type] : null
}

export function getMapNameLocalized(map:TourneyMap, localization:Localization) {
    if(map == null) return ""
    return map?.localizedNames[localization] ?? map?.localizedNames[Localization.English] ?? "???"
}