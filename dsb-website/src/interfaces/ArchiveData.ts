import {SocialMediaData} from "./StaffData";

export interface ArchiveData {
    name:string
    type:ArchiveType
    date:string
    image:string
    links:ShowableUrlElement[]
}

export interface ArchiveSeason extends ArchiveData {
    divisions:Division[]
}

export interface ArchiveTourney extends ArchiveData {
    brackets:ArchiveBracket[]
}

export interface ShowableUrlElement {
    id:number
    name:string|null
    url:string|null
    show:boolean
    showUrl:boolean
}

export interface ArchiveBracket extends ShowableUrlElement{
    winners:string[]
}

export interface Division extends ShowableUrlElement{
    links:SocialMediaData[]
}

export enum ArchiveType {
    DSB_SEASON = 1,
    DSP = 2,
    OFF_SEASON = 3
}

export function getAllArchiveTypes():ArchiveType[] {
    return [
        ArchiveType.DSB_SEASON,
        ArchiveType.DSP,
        ArchiveType.OFF_SEASON
    ]
}

export function getArchiveTypeNameLocalized(type:ArchiveType) {
    switch (type) {
        case ArchiveType.DSB_SEASON: return "Season"
        case ArchiveType.DSP: return "DSP"
        case ArchiveType.OFF_SEASON: return "Off-Season"
    }
}