export interface StaffMember {
    id:number
    name:string
    roles:StaffRole[]
    profileImageUrl:string
    color:string
    socialMedias:SocialMediaData[]
}

export interface SocialMediaData {
    name:string
    icon:string
    url:string
}

export enum Localization {
    Unknown = 0,
    English = 1,
    German = 2
}

export enum StaffRole {
    TO = 1,
    Council = 2,
    Streamer = 3,
    Developer = 4
}

export function getRoleNameLocalized(staffRole:StaffRole, local:Localization = Localization.German) {
    switch (staffRole) {
        case StaffRole.TO: return "Turnierleitung"
        case StaffRole.Council: return "Council"
        case StaffRole.Streamer: return "Streamer"
        case StaffRole.Developer: return "Entwickler"
    }
}