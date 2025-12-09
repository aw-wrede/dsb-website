import AppUserGroup from "./AppUserGroup"

export default interface AppUserCreateData {
    name: string
    displayName: string
    password: string
    userGroup: AppUserGroup
}