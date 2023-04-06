import {enumKeys} from "../functions";

export interface StaffMember {
    id:number
    name:string
    roles:StaffRole[]
    profileImageUrl:string|null
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
    Commentator = 3,
    Streamer = 4,
    Developer = 5,
    Artist = 6
}

export function getAllStaffRoles():StaffRole[] {
    const list:StaffRole[] = []
    for(const role of enumKeys(StaffRole)) {
        list.push(StaffRole[role])
    }

    return list
}

export function getRoleNameLocalized(staffRole:StaffRole, local:Localization = Localization.German) {
    switch (staffRole) {
        case StaffRole.TO: return "Turnierleitung"
        case StaffRole.Council: return "Council"
        case StaffRole.Commentator: return "Kommentator"
        case StaffRole.Streamer: return "Streamer"
        case StaffRole.Developer: return "Entwickler"
        case StaffRole.Artist: return "Artist"
    }
}