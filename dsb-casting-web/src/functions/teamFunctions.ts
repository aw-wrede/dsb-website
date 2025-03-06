import TourneyTeamRef from "../interfaces/tourney/team/TourneyTeamRef.ts";
import {stringIsNullOrEmpty} from "./functions.ts";
import TourneyTeam from "../interfaces/tourney/team/TourneyTeam.ts";

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

export function getTeamByUuid(uuid:string, teams:TourneyTeam[]):TourneyTeam {
    if(teams == null) return null
    return teams.find(team => team.uuid == uuid)
}