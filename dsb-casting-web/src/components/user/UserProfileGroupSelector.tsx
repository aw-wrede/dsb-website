import UserInfo from "../../interfaces/user/UserInfo.ts";
import AppUserGroup, {getAllGroups, getGroupName} from "../../interfaces/user/AppUserGroup.ts";
import InputSelectElement from "../../framework/form/input/InputSelectElement.ts";
import StyledInputRadio from "../../framework/form/input/StyledInputRadio.tsx";
import AppUser from "../../interfaces/user/AppUser.ts";
import {useEffect, useState} from "react";

export default function UserProfileGroupSelector({user, editUser}: {user: UserInfo, editUser:AppUser}) {
    const [group, setGroup] = useState<AppUserGroup>(AppUserGroup.Normal);

    useEffect(() => {
        editUser.userGroup = group
    }, [group]);

    const groups:AppUserGroup[] = getAllGroups().filter(group => group < user.user.userGroup)
    const inputData:InputSelectElement[] = []
    groups.forEach(group => {
        inputData.push({id: `user-group-${group}`,
            value: group,
            display: getGroupName(group),
            selected: group === editUser.userGroup
        })
    })

    return (
        <StyledInputRadio name={"user-group"} elements={inputData} selected={group} setSelected={setGroup} />
    )
}