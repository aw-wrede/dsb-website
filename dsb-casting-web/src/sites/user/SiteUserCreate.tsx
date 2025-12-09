import {useContext, useState} from "react";
import UserInfo from "../../interfaces/user/UserInfo.ts";
import {UserContext} from "../../App.tsx";
import AppUserGroup from "../../interfaces/user/AppUserGroup.ts";
import UserCreateComponent from "../../components/user/UserCreateComponent.tsx";
import AppUserCreateData from "../../interfaces/user/AppUserCreateData.ts";

export default function SiteUserCreate() {
    const user = useContext<UserInfo>(UserContext)

    const [newUser, setNewUser] = useState<AppUserCreateData>({name: "", displayName: "", password: "", userGroup: AppUserGroup.Normal} as AppUserCreateData);

    return (
        <div className={"content"}>
            <UserCreateComponent user={user} newUser={newUser} setNewUser={setNewUser} />
        </div>
    )
}