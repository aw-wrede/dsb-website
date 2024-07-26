import AppUser from "../interfaces/user/AppUser.ts";

export function getUserFromList(uuid:string, list:AppUser[]):AppUser|null {
    return list?.find((u) => u.uuid === uuid)
}

