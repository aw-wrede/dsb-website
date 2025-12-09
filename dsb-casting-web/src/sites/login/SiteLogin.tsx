import LoginComponent from "../../components/login/LoginComponent.tsx";
import UserInfo from "../../interfaces/user/UserInfo.ts";

type Props = {
    user: UserInfo
    setUser: (user:UserInfo) => void
}

export default function SiteLogin(props:Props) {
    return (
        <div className={"content"}>
            <LoginComponent setUser={props.setUser} />
        </div>
    )
}