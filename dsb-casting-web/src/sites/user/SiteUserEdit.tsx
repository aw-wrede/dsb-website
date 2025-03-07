import UserInfo from "../../interfaces/user/UserInfo.ts";
import {UserContext} from "../../App.tsx";
import { useContext, useEffect, useState } from "react";
import UserProfileComponent from "../../components/user/UserProfileComponent.tsx";
import AppUser from "../../interfaces/user/AppUser.ts";
import {getUserData} from "../../axios/AxiosApi.ts";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function SiteUserEdit() {
    const user = useContext<UserInfo>(UserContext)

    const {uuid} = useParams()

    const [userToEdit, setUserToEdit] = useState<AppUser | null>(null)

    useEffect(() => {
        const cancelToken = axios.CancelToken.source()

        getUserData(uuid, cancelToken.token).then(setUserToEdit)
    }, []);

    return (
        <div className={"content"}>
            {userToEdit == null ? null :
                <UserProfileComponent user={user} userToEdit={userToEdit} />
            }
        </div>
    )
}