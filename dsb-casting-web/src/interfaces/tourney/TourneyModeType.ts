import Localization from "../Localization.tsx";

enum TourneyModeType {
    Unknown = 0,
    Turf = 1,
    SplatZones = 2,
    TowerControl = 3,
    Rainmaker = 4,
    ClamBlitz = 5
}

export function getAllTourneyModes():TourneyModeType[] {
    return [
        TourneyModeType.Unknown,
        TourneyModeType.Turf,
        TourneyModeType.SplatZones,
        TourneyModeType.TowerControl,
        TourneyModeType.Rainmaker,
        TourneyModeType.ClamBlitz
    ]
}

export function getTourneyModeNameLocalized(mode:TourneyModeType, localization:Localization):string {
    switch (mode) {
        case TourneyModeType.Turf:
            switch (localization) {
                case Localization.German:
                    return "Revierkampf"
                default:
                    return "Turf War"
            }
        case TourneyModeType.SplatZones:
            switch (localization) {
                case Localization.German:
                    return "Herrschaft"
                default:
                    return "Splat Zones"
            }
        case TourneyModeType.TowerControl:
            switch (localization) {
                case Localization.German:
                    return "Turmkommando"
                default:
                    return "Tower Control"
            }
        case TourneyModeType.Rainmaker:
            switch (localization) {
                case Localization.German:
                    return "Operation Goldfisch"
                default:
                    return "Rainmaker"
            }
        case TourneyModeType.ClamBlitz:
            switch (localization) {
                case Localization.German:
                    return "Muschelchaos"
                default:
                    return "Clam Blitz"
            }
        default:
            switch (localization) {
                case Localization.German:
                    return "Nicht gesetzt"
                default:
                    return "Nothing"
            }
    }
}

export default TourneyModeType