import LoginComponent from "../../components/login/LoginComponent.tsx";
import UserInfo from "../../interfaces/user/UserInfo.ts";

export default function SiteLogin({user, setUser} : {user: UserInfo, setUser: (user:UserInfo) => void}) {

    return (
        <div className={"content"}>
            <LoginComponent setUser={setUser} />
        </div>
    )
}