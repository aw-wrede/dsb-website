import {enumKeys} from "../functions";

//Turnierleiter
const COLOR_TO = "#2de0bc"

//Council
const COLOR_COUNCIL = "#4dd16c"

//Developer
const COLOR_DEVELOPER = "#2424cc"

//Social Media Manager
const COLOR_SOCIAL_MEDIA_MANAGER = "#b440d8"

//Streamer
const COLOR_STREAMER = "#e64e14"

//Kommentator
const COLOR_COMMENTATOR = "#d67754"

//Cutter
const COLOR_CUTTER = "#1587ce"

//Designer
const COLOR_DESIGNER = "#d08ce2"

export interface StaffMember {
    id:number
    name:string
    roles:StaffRole[]
    profileImageUrl:string|null
    customColor:string|null
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
    Developer = 10,
    SocialMediaManager = 20,
    Streamer = 21,
    Commentator = 22,
    Cutter = 23,
    Designer = 30
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
        case StaffRole.Developer: return "Developer"

        case StaffRole.SocialMediaManager: return "Social-Media-Manager"
        case StaffRole.Streamer: return "Streamer"
        case StaffRole.Cutter: return "Cutter"
        case StaffRole.Commentator: return "Kommentator"

        case StaffRole.Designer: return "Designer"
    }
}

export function getStaffColor(staffMember:StaffMember):string {
    return staffMember.customColor ?? getPreferredColor(staffMember.roles) ?? ""
}

export function getStaffRoleColor(staffRole:StaffRole):string {
    switch (staffRole) {
        case StaffRole.TO: return COLOR_TO
        case StaffRole.Council: return COLOR_COUNCIL
        case StaffRole.Developer: return COLOR_DEVELOPER
        case StaffRole.SocialMediaManager: return COLOR_SOCIAL_MEDIA_MANAGER
        case StaffRole.Streamer: return COLOR_STREAMER
        case StaffRole.Commentator: return COLOR_COMMENTATOR
        case StaffRole.Cutter: return COLOR_CUTTER
        case StaffRole.Designer: return COLOR_DESIGNER
    }
}

export function getPreferredColor(staffRoles:StaffRole[]):string|null {
    const length = staffRoles.length
    if(length === 0) {
        return null
    }
    let highestRole:StaffRole = staffRoles[0]


    for(let i = 0; i < length; i++) {
        if(staffRoles[i] < highestRole) {
            highestRole = staffRoles[i]
        }
    }

    return getStaffRoleColor(highestRole)
}