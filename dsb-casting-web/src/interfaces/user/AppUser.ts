import AppUserGroup from "./AppUserGroup.ts";

export default interface AppUser {
    uuid:string
    name: string
    displayName: string
    userGroup:AppUserGroup
    selectedOverlay:string|null
}