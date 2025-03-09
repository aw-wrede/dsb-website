import TourneyTeam from "../../../interfaces/tourney/team/TourneyTeam.ts";
import {useEffect, useState} from "react";
import StyledFormHeader from "../../../framework/form/header/StyledFormHeader.tsx";
import StyledInput from "../../../framework/form/input/StyledInput.tsx";
import StyledInputWithButton from "../../../framework/form/input/StyledInputWithButton.tsx";
import StyledIcon from "../../../framework/StyledIcon.tsx";
import FrameworkIcon from "../../../framework/FrameworkIcon.ts";
import TeamCreateResult, {getTeamCreateResultMessage} from "../../../axios/results/TeamCreateResult.ts";
import StyledButton from "../../../framework/form/button/StyledButton.tsx";
import StyledForm from "../../../framework/form/StyledForm.tsx";
import UserInfo from "../../../interfaces/user/UserInfo.ts";
import BasicFormType from "../BasicFormType.ts";
import StyledFileInput from "../../../framework/form/input/StyledFileInput.tsx";
import {updateTeamLogo} from "../../../axios/AxiosApi.ts";
import axios from "axios";
import FileUploadResult, {getFileUploadResultMessage} from "../../../axios/results/FileUploadResult.ts";
import ButtonActionStatus from "../../../framework/form/button/ButtonActionStatus.ts";

type Props = {
    user: UserInfo
    team: TourneyTeam
    setTeam: (team:TourneyTeam) => void
    onSubmit: (e:any) => Promise<boolean>
    submitResult: TeamCreateResult
    type: BasicFormType
}

export default function TeamEditForm(props:Props) {
    const [memberInput, setMemberInput] = useState<string>("")
    const [file, setFile] = useState<File>(null)

    const [teamSuccess, setTeamSuccess] = useState<ButtonActionStatus>(ButtonActionStatus.Nothing)
    const [logoSuccess, setLogoSuccess] = useState<ButtonActionStatus>(ButtonActionStatus.Nothing)

    const [logoSubmitResult, setLogoSubmitResult] = useState<FileUploadResult>(null)

    function setTeamName(name:string) {
        const newTeam = Object.assign({}, props.team)
        newTeam.name = name
        props.setTeam(newTeam)
    }

    function addMember(name:string) {
        const newTeam = Object.assign({}, props.team)
        newTeam.members.push(name)
        props.setTeam(newTeam)
        setMemberInput("")
    }

    function removeMember(name:string) {
        const newTeam = Object.assign({}, props.team)
        newTeam.members = newTeam.members.filter(member => member !== name)
        props.setTeam(newTeam)
    }

    async function onTeamLogoSubmit(e:any):Promise<boolean> {
        e.preventDefault()
        const cancelToken = axios.CancelToken.source()
        const result = await updateTeamLogo(cancelToken.token, props.team.uuid, file)

        setLogoSubmitResult(result)

        console.log(`Update team logo result: ${result}`)

        if(result === FileUploadResult.Success){
            setLogoSuccess(ButtonActionStatus.Success)
        } else {
            setLogoSuccess(ButtonActionStatus.Error)
        }
        setTimeout(() => {
            setLogoSuccess(ButtonActionStatus.Nothing)
        }, 2000)

        return result === FileUploadResult.Success
    }

    /**
     * Set submit button design to show submit result
     */
    useEffect(() => {
        if(props.submitResult == null) {
            setTeamSuccess(ButtonActionStatus.Nothing)
            return
        }

        if(props.submitResult === TeamCreateResult.Success) {
            setTeamSuccess(ButtonActionStatus.Success)
        } else {
            setTeamSuccess(ButtonActionStatus.Error)
        }
        setTimeout(() => {
            setTeamSuccess(ButtonActionStatus.Nothing)
        }, 2000)
    }, [props.submitResult]);

    return <>
        <StyledForm onSubmit={props.onSubmit}>
            <StyledFormHeader headline={props.type === BasicFormType.Create ? "Neues Team erstellen" : "Team bearbeiten"}></StyledFormHeader>
            <StyledInput name={"new-team-name"} type={"text"} value={props.team.name} onChange={e => setTeamName(e.target.value)}
                         placeholder={"Teamname"} autoComplete={"off"} required={true}/>

            <StyledFormHeader headline={"Mitglieder hinzufügen"}></StyledFormHeader>
            <StyledInputWithButton name={"new-team-add-member"} type={"text"} value={memberInput}
                                   buttonChildren={<StyledIcon icon={FrameworkIcon.Add} />}
                                   onChange={e => setMemberInput(e.target.value)} onClick={() => addMember(memberInput)}
                                   placeholder={"Name des neuen Mitglieds"} required={false} autoComplete={"off"} />

            <div className={"chips-list"}>
                {props.team.members.map((member) => (
                    <div key={member} className={"chip"}>
                        <p>{member}</p>
                        <StyledIcon icon={FrameworkIcon.Close} onClick={() => removeMember(member)}/>
                    </div>
                ))}
            </div>

            {props.submitResult != null ? <p>{getTeamCreateResultMessage(props.submitResult, props.user.localization)}</p> : null}

            <StyledButton type={"submit"} success={teamSuccess}>{props.type === BasicFormType.Create ? "Team erstellen" : "Team aktualisieren"}</StyledButton>
        </StyledForm>
        {props.type !== BasicFormType.Edit ? null :
            <div>
                <StyledForm onSubmit={onTeamLogoSubmit} >
                    <StyledFormHeader headline={"Teamlogo anpassen"} />
                    <StyledFileInput name={"team-logo-file"} accept={"image/*"} file={file} setFile={setFile} required={true} />
                    <StyledButton type={"submit"} success={logoSuccess}>Logo speichern</StyledButton>
                    {logoSubmitResult != null ? <p>{getFileUploadResultMessage(logoSubmitResult, props.user.localization)}</p> : null}
                </StyledForm>
            </div>
        }
    </>
}