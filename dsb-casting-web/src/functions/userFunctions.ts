import AppUser from "../interfaces/user/AppUser.ts";
import AppUserRef from "../interfaces/user/AppUserRef.ts";
import AppUserGroup from "../interfaces/user/AppUserGroup.ts";
import Localization from "../interfaces/Localization.tsx";

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

export function getUserGroupLocalized(role:AppUserGroup, localization:Localization = Localization.English):string {
    switch(role) {
        case AppUserGroup.Guest:
            switch (localization) {
                case Localization.German:
                    return "Gast"
                case Localization.English:
                default:
                    return "Guest"
            }

        case AppUserGroup.Unverified:
            switch (localization) {
                case Localization.German:
                    return "Nicht verifiziert"
                case Localization.English:
                default:
                    return "Unverified"
            }

        case AppUserGroup.Normal:
            switch (localization) {
                case Localization.German:
                    return "Nutzer"
                case Localization.English:
                default:
                    return "User"
            }

        case AppUserGroup.Privileged:
            switch (localization) {
                case Localization.German:
                    return "Privilegiert"
                case Localization.English:
                default:
                    return "Privileged"
            }

        case AppUserGroup.Admin:
            switch (localization) {
                case Localization.German:
                case Localization.English:
                default:
                    return "Admin"
            }

        case AppUserGroup.SuperUser:
            switch (localization) {
                case Localization.German:
                case Localization.English:
                default:
                    return "SuperUser"
            }

        case AppUserGroup.Default:
        default:
            switch (localization) {
                case Localization.German:
                    return "Nicht gesetzt"
                case Localization.English:
                default:
                    return "Not set"
            }
    }
}