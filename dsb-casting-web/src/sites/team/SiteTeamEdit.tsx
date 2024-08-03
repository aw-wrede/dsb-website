import {useContext, useEffect, useState} from "react";
import UserInfo from "../../interfaces/user/UserInfo.ts";
import {UserContext} from "../../App.tsx";
import {useParams} from "react-router-dom";
import TourneyTeam from "../../interfaces/tourney/team/TourneyTeam.ts";
import axios from "axios";
import {getTeam, updateTeam} from "../../axios/AxiosApi.ts";
import TeamEditForm from "../../components/forms/team/TeamEditForm.tsx";
import BasicFormType from "../../components/forms/BasicFormType.ts";
import TeamCreateResult from "../../axios/results/TeamCreateResult.ts";

export default function SiteTeamEdit() {
    const user = useContext<UserInfo>(UserContext)
    const {uuid} = useParams()

    const [team, setTeam] = useState<TourneyTeam>(null)
    const [submitResult, setSubmitResult] = useState<TeamCreateResult>(null);

    useEffect(() => {
        const cancelToken = axios.CancelToken.source()

        getTeam(cancelToken.token, uuid).then(setTeam)

        return () => {
            cancelToken.cancel()
        }
    }, []);

    async function onSubmit(e) {
        e.preventDefault()

        setSubmitResult(null)

        const cancelToken = axios.CancelToken.source()
        const result = await updateTeam(cancelToken.token, team)

        setSubmitResult(result)

        console.log(`Update status: ${result}`)

        return true
    }

    return <div className={"content"}>
        {team == null ? null :
            <TeamEditForm user={user} team={team} setTeam={setTeam} onSubmit={onSubmit} submitResult={submitResult} type={BasicFormType.Edit} />
        }
    </div>
}