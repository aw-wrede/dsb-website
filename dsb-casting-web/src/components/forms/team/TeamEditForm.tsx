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
import TeamFormType from "./TeamFormType.ts";

export default function TeamEditForm({user, team, setTeam, onSubmit, submitResult, type}:{user:UserInfo, team:TourneyTeam, setTeam: (team:TourneyTeam) => void, onSubmit:(e:any) => Promise<boolean>, submitResult:TeamCreateResult, type:TeamFormType}) {
    const [memberInput, setMemberInput] = useState<string>("")


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

    return <StyledForm onSubmit={onSubmit}>
        <StyledFormHeader headline={type === TeamFormType.Create ? "Neues Team erstellen" : "Team bearbeiten"}></StyledFormHeader>
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

        <StyledButton type={"submit"}>{type === TeamFormType.Create ? "Team erstellen" : "Team aktualisieren"}</StyledButton>
    </StyledForm>
}