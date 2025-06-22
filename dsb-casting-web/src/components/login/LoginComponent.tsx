import StyledForm from "../../framework/form/StyledForm.tsx";
import React, {useState} from "react";
import LoginData from "../../interfaces/LoginData.ts";
import {performLogin} from "../../axios/AxiosApi.ts";
import axios from "axios";
import AppUser from "../../interfaces/user/AppUser.ts";
import StyledInput from "../../framework/form/input/StyledInput.tsx";
import StyledButton from "../../framework/form/button/StyledButton.tsx";
import StyledFormHeader from "../../framework/form/header/StyledFormHeader.tsx";

import "./login.sass"
import UserInfo from "../../interfaces/user/UserInfo.ts";
import {useNavigate} from "react-router-dom";
import LoginStatus from "../../interfaces/LoginStatus.ts";
import {getBrowserLocalization} from "../../functions/localizationFunctions.ts";
import ButtonActionStatus from "../../framework/form/button/ButtonActionStatus.ts";

type Props = {
    setUser: (user:UserInfo) => void
}

export default function LoginComponent(props:Props) {

    const navigate = useNavigate()

    const [loginData, setLoginData]:[LoginData, any] = useState({name:"",password:""})

    const [loginSuccess, setLoginSuccess] = useState<ButtonActionStatus>(ButtonActionStatus.Nothing)

    async function onLogin(e):Promise<boolean> {
        e.preventDefault()

        setLoginSuccess(ButtonActionStatus.Loading)

        const cancelToken = axios.CancelToken.source()
        const user:AppUser|null = await performLogin(loginData, cancelToken.token)

        props.setUser({
            user:user,
            loginStatus: user != null ? LoginStatus.Authorized : LoginStatus.Unauthorized,
            localization: getBrowserLocalization()
        })

        console.log(user)

        if(user != null) {
            setLoginSuccess(ButtonActionStatus.Success)
            navigate("/")
        } else {
            setLoginSuccess(ButtonActionStatus.Error)
            setTimeout(() => {
                setLoginSuccess(ButtonActionStatus.Nothing)
            }, 2000)
        }

        return user != null
    }

    function onUsernameChange(e: React.ChangeEvent<HTMLInputElement>) {
        const data:LoginData = {
            name: e.target.value,
            password: loginData.password
        }

        setLoginData(data)
    }

    function onPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
        const data:LoginData = {
            name: loginData.name,
            password: e.target.value
        }

        setLoginData(data)
    }

    return (
        <div className={"login-component"}>
            <StyledForm onSubmit={async (e) => await onLogin(e)}>
                <StyledFormHeader headline={"DSB Casting Overlay - Anmelden"}></StyledFormHeader>
                <StyledInput name={"name"} type={"text"} value={loginData.name} onChange={e => onUsernameChange(e)}
                             placeholder={"Nutzername"} required={true} autoComplete={"username"} />
                <StyledInput name={"password"} type={"password"} value={loginData.password} onChange={e => onPasswordChange(e)} placeholder={"Passwort"} required={true} autoComplete={"current-password"} />
                <StyledButton type={"submit"} children={"Anmelden"} success={loginSuccess}/>
            </StyledForm>
        </div>
    )
}