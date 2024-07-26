import SearchDropdown from "../../framework/form/input/search/SearchDropdown.tsx";
import AppUser from "../../interfaces/user/AppUser.ts";
import {useEffect, useState} from "react";
import SearchElement from "../../framework/form/input/search/SearchElement.ts";

export default function UserSearchList({id, placeholder, users, selectUser}:{id:string, placeholder?:string, users:AppUser[], selectUser:(user:AppUser) => void}) {

    const [input, setInput] = useState("")
    const [elems, setElems] = useState<SearchElement[]>([]);

    useEffect(() => {
        if(users == null) {
            return
        }

        const elems:SearchElement[] = []
        users.forEach(user => {
            elems.push({
                id: user.uuid,
                name: user.uuid,
                value: user,
                displayName: user.displayName
            })
        })

        setElems(elems)
    }, [users]);

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
        selectUser(val)
    }

    return <SearchDropdown input={input} setInput={setInput} setVal={setVal} attributes={{
        id: id,
        name: "search-user",
        autoComplete: "off",
        placeholder: placeholder ?? "Nutzer"
    }} filter={filter} />
}