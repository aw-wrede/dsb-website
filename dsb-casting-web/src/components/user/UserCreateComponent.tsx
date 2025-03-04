import "./user.sass"
import StyledForm from "../../framework/form/StyledForm.tsx";
import StyledFormHeader from "../../framework/form/header/StyledFormHeader.tsx";
import StyledInput from "../../framework/form/input/StyledInput.tsx";
import FrameworkIcon from "../../framework/FrameworkIcon.ts";
import AppUserCreateData from "../../interfaces/user/AppUserCreateData.ts";
import UserProfileGroupSelector from "./UserProfileGroupSelector.tsx";
import UserInfo from "../../interfaces/user/UserInfo.ts";
import StyledButton from "../../framework/form/button/StyledButton.tsx";
import {createNewUser} from "../../axios/AxiosApi.ts";
import axios from "axios";
import { useState } from "react";
import ButtonActionStatus from "../../framework/form/button/ButtonActionStatus.ts";

type Props = {
    user:UserInfo
    newUser: AppUserCreateData,
    setNewUser: (newUser: AppUserCreateData) => void,
}

export default function UserCreateComponent(props:Props) {

    const [submitSuccess, setSubmitSuccess] = useState<ButtonActionStatus>(ButtonActionStatus.Nothing)

    async function onSubmit(e) {
        setSubmitSuccess(ButtonActionStatus.Loading)
        e.preventDefault()
        console.log(props.newUser)

        const cancelToken = axios.CancelToken.source()

        const result = await createNewUser(props.newUser, cancelToken.token)

        setSubmitSuccess(result ? ButtonActionStatus.Success : ButtonActionStatus.Error)
        setTimeout(() => {
            setSubmitSuccess(ButtonActionStatus.Nothing)
        }, 2000)

        return result
    }

    function updateValue(e) {
        const data = Object.assign({}, props.newUser)
        const value = e.target.value

        console.log("Update")

        switch (e.target.name) {
            case "name":
                data.name = value
                break
            case "displayname":
                data.displayName = value
                break
            case "password":
                data.password = value
                break
            default:
                return
        }

        props.setNewUser(data)
    }

    return (
        <div className={"component user-component"}>
            <StyledForm onSubmit={e => onSubmit(e)}>
                <StyledFormHeader headline={"Neuen Account erstellen"} />

                <StyledInput name={"name"} type={"text"} value={props.newUser.name}
                             onChange={e => updateValue(e)} placeholder={"Nutzername"}
                             required={true} icon={FrameworkIcon.AccountCircle} autoComplete={"off"} />
                <StyledInput name={"displayname"} type={"text"} value={props.newUser.displayName}
                             onChange={e => updateValue(e)} placeholder={"Anzeigename"}
                             required={true} icon={FrameworkIcon.Face} autoComplete={"off"} />
                <StyledInput name={"password"} type={"password"} value={props.newUser.password}
                             onChange={e => updateValue(e)} placeholder={"Passwort"}
                             required={true} icon={FrameworkIcon.Key} autoComplete={"new-password"} />

                <UserProfileGroupSelector user={props.user} editUser={props.newUser} setEditUser={props.setNewUser} />

                <StyledButton success={submitSuccess} type={"submit"} children={"Nutzer hinzufügen"}/>
            </StyledForm>
        </div>
    )
}