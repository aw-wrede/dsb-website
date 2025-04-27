import AppUser from "../../interfaces/user/AppUser.ts";
import {getApiToken, saveUserData} from "../../axios/AxiosApi.ts";
import axios from "axios";
import StyledButton from "../../framework/form/button/StyledButton.tsx";
import StyledForm from "../../framework/form/StyledForm.tsx";
import FrameworkIcon from "../../framework/FrameworkIcon.ts";
import {useEffect, useState} from "react";
import StyledFormHeader from "../../framework/form/header/StyledFormHeader.tsx";
import StyledInput from "../../framework/form/input/StyledInput.tsx";
import UserInfo from "../../interfaces/user/UserInfo.ts";
import UserProfileGroupSelector from "./UserProfileGroupSelector.tsx";

import "./user.sass"

type Props = {
    user:UserInfo
    userToEdit:AppUser
}

export default function UserProfileComponent(props:Props) {

    const [userApiToken, setUserApiToken] = useState<string>("");
    const [userData, setUserData] = useState<AppUser>(props.userToEdit)
    const [newPassword, setNewPassword] = useState({password: "", passwordConfirm: ""})

    useEffect(() => {
        const cancelToken = axios.CancelToken.source()

        getApiToken(cancelToken.token).then(token => {
            if(token == null) {
                return
            }

            setUserApiToken(token);
        })
    }, [])

    useEffect(() => {
        setUserData(props.userToEdit);
    }, [props.userToEdit]);

    function updateValue(e) {
        const data = Object.assign({}, userData)
        const value = e.target.value

        console.log("Update")

        switch (e.target.name) {
            case "name":
                data.name = value
                break
            case "displayname":
                data.displayName = value
                break
            default:
                return
        }

        setUserData(data)
    }

    function updateNewPassword(e) {
        const data = Object.assign({}, newPassword)
        const value = e.target.value

        switch (e.target.name) {
            case "password":
                data.password = value
                break
            case "passwordConfirm":
                data.passwordConfirm = value
                break
            default:
                return
        }

        setNewPassword(data)
    }

    async function onSubmit(e) {
        e.preventDefault()
        const cancelToken = axios.CancelToken.source()
        const result = saveUserData(userData, cancelToken.token)
        console.log(await result)
        return result
    }

    async function onPasswordChange(e) {
        e.preventDefault()
        if(newPassword.password !== newPassword.passwordConfirm) {
            return false
        }
    }

    function isPasswordValid():boolean|null {
        if(newPassword.password.length === 0 || newPassword.passwordConfirm.length === 0) {
            return null
        }
        return newPassword.password === newPassword.passwordConfirm
    }

    return (
        <div className={"component user-component"}>
            <StyledForm onSubmit={e => onSubmit(e)}>
                <StyledFormHeader headline={props.user.user.uuid === props.userToEdit.uuid ? "Dein Profil" : `Profil von ${props.userToEdit.displayName}`}></StyledFormHeader>

                {props.user.user.uuid !== props.userToEdit.uuid ? null :
                    <StyledInput name={"apiToken"} type={"text"} value={userApiToken} onChange={() => {}} placeholder={"Dein API Token"} required={false} readonly={true} icon={FrameworkIcon.Key} /> }

                <StyledInput name={"name"} type={"text"} value={userData.name}
                             onChange={e => updateValue(e)} placeholder={"Nutzername"}
                             required={true} icon={FrameworkIcon.AccountCircle} autoComplete={"off"} />
                <StyledInput name={"displayname"} type={"text"} value={userData.displayName}
                             onChange={e => updateValue(e)} placeholder={"Anzeigename"}
                             required={true} icon={FrameworkIcon.Face} autoComplete={"off"} />

                {props.user.user.uuid !== props.userToEdit.uuid ? (
                    <UserProfileGroupSelector user={props.user} editUser={props.userToEdit} setEditUser={setUserData} />
                ) : null}

                <StyledButton type={"submit"} children={"Speichern"}/>
            </StyledForm>
            <StyledForm onSubmit={e => onPasswordChange(e)}>
                <input type={"text"} name={"name"} hidden={true} value={userData.name} readOnly={true} autoComplete={"username"}/>
                <div className={"ui-form-header"}>
                    <h2 className="ui-form-headline">Passwort ändern</h2>
                </div>
                <StyledInput name={"password"} type={"password"} value={newPassword.password}
                         onChange={e => updateNewPassword(e)} placeholder={"Neues Passwort"}
                         required={true} icon={FrameworkIcon.Key} valid={isPasswordValid()} autoComplete={"new-password"} />
                <StyledInput name={"passwordConfirm"} type={"password"} value={newPassword.passwordConfirm}
                         onChange={e => updateNewPassword(e)} placeholder={"Neues Passwort bestätigen"}
                         required={true} icon={FrameworkIcon.Key} valid={isPasswordValid()} autoComplete={"new-password"} />
                <StyledButton type={"submit"} children={"Speichern"}/>
            </StyledForm>
        </div>
    )
}