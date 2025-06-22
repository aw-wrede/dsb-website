import SearchDropdown from "../../framework/form/input/search/SearchDropdown.tsx";
import AppUser from "../../interfaces/user/AppUser.ts";
import {useEffect, useState} from "react";
import SearchElement from "../../framework/form/input/search/SearchElement.ts";

type Props = {
    id:string
    placeholder?:string
    users:AppUser[]
    selectUser:(user:AppUser) => void
}

export default function UserSearchList(props:Props) {

    const [input, setInput] = useState("")
    const [elems, setElems] = useState<SearchElement[]>([]);

    useEffect(() => {
        if(props.users == null) {
            return
        }

        const elems:SearchElement[] = []
        props.users.forEach(user => {
            elems.push({
                id: user.uuid,
                name: user.uuid,
                value: user,
                displayName: user.displayName
            })
        })

        setElems(elems)
    }, [props.users]);

    function filter(s:string):SearchElement[] {
        return elems.filter(elem => {
            const user = elem.value as AppUser

            if(s == null || s == "") {
                return true
            }

            return user.displayName.toLowerCase().includes(s.toLowerCase())
        })
    }

    function setVal(val:any) {
        setInput("")
        props.selectUser(val)
    }

    return <SearchDropdown input={input} setInput={setInput} setVal={setVal} attributes={{
        id: props.id,
        name: "search-user",
        autoComplete: "off",
        placeholder: props.placeholder ?? "Nutzer"
    }} filter={filter} />
}