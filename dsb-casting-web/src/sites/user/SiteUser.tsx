import UserProfileComponent from "../../components/user/UserProfileComponent.tsx";
import UserInfo from "../../interfaces/user/UserInfo.ts";
import {useContext} from "react";
import {UserContext} from "../../App.tsx";

export default function SiteUser() {
    const user = useContext<UserInfo>(UserContext)

    return (
        <div className={"content"}>
            <UserProfileComponent user={user} userToEdit={user.user} />
        </div>
    )
}