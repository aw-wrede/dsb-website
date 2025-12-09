import {useContext, useState} from "react";
import TourneyTeam from "../../interfaces/tourney/team/TourneyTeam.ts";
import {saveNewTeam} from "../../axios/AxiosApi.ts";
import axios from "axios";
import TeamCreateResult from "../../axios/results/TeamCreateResult.ts";
import UserInfo from "../../interfaces/user/UserInfo.ts";
import {UserContext} from "../../App.tsx";
import TeamEditForm from "../../components/forms/team/TeamEditForm.tsx";
import BasicFormType from "../../components/forms/BasicFormType.ts";

export default function SiteCreateTeam() {
    const user = useContext<UserInfo>(UserContext)

    const [team, setTeam] = useState<TourneyTeam>({
        uuid: "",
        name: "",
        teamLogoUrl: "",
        members: []
    })
    const [submitResult, setSubmitResult] = useState<TeamCreateResult>(null);

    async function onSubmit(e) {
        e.preventDefault()

        setSubmitResult(null)

        const cancelToken = axios.CancelToken.source()
        const result = await saveNewTeam(cancelToken.token, team)

        setSubmitResult(result)

        console.log(`Created status: ${result}`)

        return true
    }

    return <div className={"content"}>
        <TeamEditForm user={user} team={team} setTeam={setTeam} onSubmit={onSubmit} submitResult={submitResult} type={BasicFormType.Create} />
    </div>
}