import UserInfo from "../../interfaces/user/UserInfo.ts";
import AppUserGroup, {getAllGroups, getGroupName} from "../../interfaces/user/AppUserGroup.ts";
import InputSelectElement from "../../framework/form/input/InputSelectElement.ts";
import StyledInputRadio from "../../framework/form/input/StyledInputRadio.tsx";
import AppUser from "../../interfaces/user/AppUser.ts";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import AppUserCreateData from "../../interfaces/user/AppUserCreateData.ts";

type Props = {
    user: UserInfo
    editUser: AppUser|AppUserCreateData
    setEditUser: Dispatch<SetStateAction<AppUser|AppUserCreateData>>
}

export default function UserProfileGroupSelector(props:Props) {
    const [group, setGroup] = useState<AppUserGroup>(AppUserGroup.Normal);

    useEffect(() => {
        const data = Object.assign({}, props.editUser)
        data.userGroup = group
        props.setEditUser(data)
    }, [group]);

    const groups:AppUserGroup[] = getAllGroups().filter(group => group < props.user.user.userGroup)
    const inputData:InputSelectElement[] = []
    groups.forEach(group => {
        inputData.push({id: `user-group-${group}`,
            value: group,
            display: getGroupName(group),
            selected: group === props.editUser.userGroup
        })
    })

    return (
        <StyledInputRadio name={"user-group"} elements={inputData} selected={group} setSelected={setGroup} />
    )
}