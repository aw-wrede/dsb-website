import TourneyTeamRef from "../interfaces/tourney/team/TourneyTeamRef.ts";
import {stringIsNullOrEmpty} from "./functions.ts";

export function hasTeamLogo(team:TourneyTeamRef):boolean {
    return !stringIsNullOrEmpty(team.reference.teamLogoUrl)
}

export function teamGetLogo(team:TourneyTeamRef):string {
    if(team.reference.teamLogoUrl == null || team.reference.teamLogoUrl === "") {
        return "/images/transparent.png"
    }
    return team.reference.teamLogoUrl
}

export function teamGetName(team:TourneyTeamRef):string {
    return team.reference.name
}