import TourneyGameVersion from "../../interfaces/tourney/TourneyGameVersion.ts";

export default interface TourneyMapResult {
    mapIdentifier:number
    name:string
    gameVersion:TourneyGameVersion
    image:string
    localizedNames:{LocalizationData:string}
}