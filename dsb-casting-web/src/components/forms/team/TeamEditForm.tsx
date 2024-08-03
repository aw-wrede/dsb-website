import TourneyTeam from "../../../interfaces/tourney/team/TourneyTeam.ts";
import {useState} from "react";
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

export default function TeamEditForm({user, team, setTeam, onSubmit, submitResult, type}:{user:UserInfo, team:TourneyTeam, setTeam: (team:TourneyTeam) => void, onSubmit:(e:any) => Promise<boolean>, submitResult:TeamCreateResult, type:BasicFormType}) {
    const [memberInput, setMemberInput] = useState<string>("")
    const [file, setFile] = useState<File>(null)

    const [logoSubmitResult, setLogoSubmitResult] = useState<FileUploadResult>(null)

    function setTeamName(name:string) {
        const newTeam = Object.assign({}, team)
        newTeam.name = name
        setTeam(newTeam)
    }

    function addMember(name:string) {
        const newTeam = Object.assign({}, team)
        newTeam.members.push(name)
        setTeam(newTeam)
        setMemberInput("")
    }

    function removeMember(name:string) {
        const newTeam = Object.assign({}, team)
        newTeam.members = newTeam.members.filter(member => member !== name)
        setTeam(newTeam)
    }

    async function onTeamLogoSubmit(e:any):Promise<boolean> {
        e.preventDefault()
        const cancelToken = axios.CancelToken.source()
        const result = await updateTeamLogo(cancelToken.token, team.uuid, file)

        setLogoSubmitResult(result)

        console.log(`Update team logo result: ${result}`)

        return result === FileUploadResult.Success
    }

    return <>
        <StyledForm onSubmit={onSubmit}>
            <StyledFormHeader headline={type === BasicFormType.Create ? "Neues Team erstellen" : "Team bearbeiten"}></StyledFormHeader>
            <StyledInput name={"new-team-name"} type={"text"} value={team.name} onChange={e => setTeamName(e.target.value)}
                         placeholder={"Teamname"} autoComplete={"off"} required={true}/>

            <StyledFormHeader headline={"Mitglieder hinzufügen"}></StyledFormHeader>
            <StyledInputWithButton name={"new-team-add-member"} type={"text"} value={memberInput}
                                   buttonChildren={<StyledIcon icon={FrameworkIcon.Add} />}
                                   onChange={e => setMemberInput(e.target.value)} onClick={() => addMember(memberInput)}
                                   placeholder={"Name des neuen Mitglieds"} required={false} autoComplete={"off"} />

            <div className={"chips-list"}>
                {team.members.map((member) => (
                    <div key={member} className={"chip"}>
                        <p>{member}</p>
                        <StyledIcon icon={FrameworkIcon.Close} onClick={() => removeMember(member)}/>
                    </div>
                ))}
            </div>

            {submitResult != null ? <p>{getTeamCreateResultMessage(submitResult, user.localization)}</p> : null}

            <StyledButton type={"submit"}>{type === BasicFormType.Create ? "Team erstellen" : "Team aktualisieren"}</StyledButton>
        </StyledForm>
        {type !== BasicFormType.Edit ? null :
            <div>
                <StyledForm onSubmit={onTeamLogoSubmit} >
                    <StyledFormHeader headline={"Teamlogo anpassen"} />
                    <StyledFileInput name={"team-logo-file"} accept={"image/*"} file={file} setFile={setFile} required={true} />
                    <StyledButton type={"submit"}>Logo speichern</StyledButton>
                    {logoSubmitResult != null ? <p>{getFileUploadResultMessage(logoSubmitResult, user.localization)}</p> : null}
                </StyledForm>

            </div>
        }
    </>
}