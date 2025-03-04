enum AppUserGroup {
    Default = 0,
    Guest = 1,
    Unverified = 2,
    Normal = 10,
    Privileged = 20,
    Admin = 100,
    SuperUser = 1000
}

export function getAllGroups() {
    return [
        AppUserGroup.Guest,
        AppUserGroup.Unverified,
        AppUserGroup.Normal,
        AppUserGroup.Privileged,
        AppUserGroup.Admin,
        AppUserGroup.SuperUser
    ]
}

/**
 * @deprecated
 * @param group
 */
export function getGroupName(group: AppUserGroup):string {
    switch (group) {
        case AppUserGroup.Guest:
            return "Gast"
        case AppUserGroup.Unverified:
            return "Unverifiziert"
        case AppUserGroup.Normal:
            return "User"
        case AppUserGroup.Privileged:
            return "Moderator"
        case AppUserGroup.Admin:
            return "Admin"
        case AppUserGroup.SuperUser:
            return "SuperUser"
        default:
            return "Unknown"
    }
}

export default AppUserGroup