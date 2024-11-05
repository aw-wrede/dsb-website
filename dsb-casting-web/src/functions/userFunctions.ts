import AppUser from "../interfaces/user/AppUser.ts";
import AppUserRef from "../interfaces/user/AppUserRef.ts";

export function getUserFromList(uuid:string, list:AppUser[]):AppUser|null {
    return list?.find((u) => u.uuid === uuid)
}

export function usersToString(users:AppUserRef[]):string {
    let s = ""

    // add all users except last one
    for(let i=0; i < users.length - 1; i++) {
        s += `${users[i].reference.displayName}, `
    }

    // add last user
    s += users[users.length - 1].reference.displayName

    return s
}