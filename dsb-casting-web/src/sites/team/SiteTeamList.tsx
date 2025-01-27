import {useContext, useEffect, useState} from "react";
import TourneyTeam from "../../interfaces/tourney/team/TourneyTeam.ts";
import {getAllTeams} from "../../axios/AxiosApi.ts";
import axios from "axios";
import CollapsibleElement from "../../framework/collapsible/CollapsibleElement.ts";
import StyledIcon from "../../framework/StyledIcon.tsx";
import FrameworkIcon from "../../framework/FrameworkIcon.ts";
import AppUserGroup from "../../interfaces/user/AppUserGroup.ts";
import UserInfo from "../../interfaces/user/UserInfo.ts";
import StyledCollapsible from "../../framework/collapsible/StyledCollapsible.tsx";
import {UserContext} from "../../App.tsx";

import "./siteTeamList.sass"
import StyledInput from "../../framework/form/input/StyledInput.tsx";


export default function SiteTeamList() {
    const user = useContext<UserInfo>(UserContext)

    const [search, setSearch] = useState("");
    const [teams, setTeams] = useState<TourneyTeam[]>([]);

    useEffect(() => {
        const cancelToken = axios.CancelToken.source()
        getAllTeams(cancelToken.token).then(setTeams)

        return () => {
            cancelToken.cancel()
        }
    }, []);

    function onDeleteClick(team:TourneyTeam) {
        
    }
    
    function toCollapsibleElements(teams:TourneyTeam[], search:string|null):CollapsibleElement[] {
        const data:CollapsibleElement[] = []

        if(search == null) search = ""

        search = search.toLowerCase()

        teams.filter(t => t.name.toLowerCase().includes(search))
        .sort((a, b) => {
            return a.name.localeCompare(b.name) // sort alphabetically
        }).forEach(team => {
            data.push({
                header: <div className={"flex-row-space-between flex-vertical-center"}>
                    <div className={"overlay-title-wrapper flex-row flex-vertical-center"}>
                        <p>{team.name}</p>
                    </div>
                    <div className={"actions"}>
                        <a href={`/team/edit/${team.uuid}`}><StyledIcon icon={FrameworkIcon.Edit}/></a>
                        {user.user.userGroup >= AppUserGroup.Privileged ?
                            <StyledIcon icon={FrameworkIcon.Delete} onClick={() => {
                                onDeleteClick(team)
                            }}/>
                            : null}
                    </div>
                </div>,
                body: <div className={"flex-row"}>
                    {team.teamLogoUrl != null && team.teamLogoUrl != "" ?
                        <img className={"team-logo"} src={team.teamLogoUrl} alt={"Logo of team"}/> : null}
                    <div className={"chips-list"}>
                        {team.members.map((member) => (
                            <div key={member} className={"chip"}>
                                <p>{member}</p>
                            </div>
                        ))}
                    </div>
                </div>
            } as CollapsibleElement)
        })

        return data
    }

    return <div className={"content site-team-list"}>
        <StyledInput name={"filter-teams"} type={"text"} value={search} onChange={e => setSearch(e.target.value)} placeholder={"Teams filtern"} required={false} autoComplete={"off"} />
        <StyledCollapsible elements={toCollapsibleElements(teams, search)}/>
    </div>
}