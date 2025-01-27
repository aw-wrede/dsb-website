import {useContext, useEffect, useState} from "react";
import UserInfo from "../../interfaces/user/UserInfo.ts";
import {UserContext} from "../../App.tsx";
import AppUser from "../../interfaces/user/AppUser.ts";
import axios from "axios";
import {getAllUsers} from "../../axios/AxiosApi.ts";
import CollapsibleElement from "../../framework/collapsible/CollapsibleElement.ts";
import StyledIcon from "../../framework/StyledIcon.tsx";
import FrameworkIcon from "../../framework/FrameworkIcon.ts";
import AppUserGroup from "../../interfaces/user/AppUserGroup.ts";
import {getUserGroupLocalized} from "../../functions/userFunctions.ts";
import StyledInput from "../../framework/form/input/StyledInput.tsx";
import StyledCollapsible from "../../framework/collapsible/StyledCollapsible.tsx";

export default function SiteUserList() {
    const user = useContext<UserInfo>(UserContext)

    const [search, setSearch] = useState<string>("");
    const [users, setUsers] = useState<AppUser[]>([])

    useEffect(() => {
        const cancelToken = axios.CancelToken.source()
        getAllUsers(cancelToken.token).then((users) => {
            if(users == null) {
                return
            }

            setUsers(users.sort((a, b) => {
                if(a.userGroup != b.userGroup) return a.userGroup - b.userGroup // sort by group
                return a.name.localeCompare(b.name) // sort alphabetically
            }))
        })

        return () => {
            cancelToken.cancel()
        }
    }, []);

    function onDeleteClick(u:AppUser) {

    }

    function toCollapsibleElements(users:AppUser[], search:string|null):CollapsibleElement[] {
        const data:CollapsibleElement[] = []

        if(search == null) search = ""

        search = search.toLowerCase()

        users.filter(t => t.name.toLowerCase().includes(search)).forEach(u => {
            data.push({
                header: <div className={"flex-row-space-between flex-vertical-center"}>
                    <div className={"overlay-title-wrapper flex-row flex-vertical-center"}>
                        <p>{u.name}</p>
                    </div>
                    <div className={"actions"}>
                        <a href={`/user/edit/${u.uuid}`}><StyledIcon icon={FrameworkIcon.Edit}/></a>
                        {user.user.userGroup >= AppUserGroup.Privileged ?
                            <StyledIcon icon={FrameworkIcon.Delete} onClick={() => {
                                onDeleteClick(u)
                            }}/>
                            : null}
                    </div>
                </div>,
                body: <div>
                    <p>Uuid: {u.uuid}</p>
                    <p>Anzeigename: {u.displayName}</p>
                    <p>Rolle: {getUserGroupLocalized(u.userGroup, user.localization)}</p>
                </div>
            } as CollapsibleElement)
        })

        return data
    }

    return (
        <div className={"content"}>
            <StyledInput name={"filter-users"} type={"text"} value={search} onChange={e => setSearch(e.target.value)} placeholder={"Nutzer filtern"} required={false} autoComplete={"off"} />
            <StyledCollapsible elements={toCollapsibleElements(users, search)}/>
        </div>
    )
}