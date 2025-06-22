import StyledIcon from "../../framework/StyledIcon.tsx";
import FrameworkIcon from "../../framework/FrameworkIcon.ts";
import StyledButton from "../../framework/form/button/StyledButton.tsx";

import "./header.sass";
import {performLogout} from "../../axios/AxiosApi.ts";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import UserInfo from "../../interfaces/user/UserInfo.ts";
import LoginStatus from "../../interfaces/LoginStatus.ts";

type Props = {
    user:UserInfo
    setUser: (user:UserInfo) => void
}

export default function HeaderComponent(props:Props) {
    const navigate = useNavigate()

    async function onClick() {
        const cancelToken = axios.CancelToken.source()
        const success = await performLogout(cancelToken.token)

        if(success) {
            props.setUser({user: null, loginStatus: LoginStatus.Unauthorized, localization: props.user.localization})
            console.log("Logged out")
            navigate("/")
        }
    }

    return (
        <header className={"flex-row ui-panel header"}>
            <div className={"header-left"}>
                <a href="/"><h1 className={"title"}>DSB Casting Overlay</h1></a>
            </div>
            <div className={"header-right"}>
                {props.user.loginStatus === LoginStatus.Authorized ? (<StyledButton type={"button"} onClick={onClick}>
                    <StyledIcon icon={FrameworkIcon.Logout} />
                </StyledButton>) : null}
            </div>
        </header>
    )
}