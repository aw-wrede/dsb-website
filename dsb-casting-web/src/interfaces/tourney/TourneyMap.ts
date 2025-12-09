import TourneyGameVersion from "./TourneyGameVersion.ts";
import Localization from "../Localization.tsx";

export default interface TourneyMap {
    mapIdentifier:number
    name:string
    gameVersion:TourneyGameVersion
    image:string
    localizedNames:Record<Localization, string>
}