import {SocialMediaData} from "./StaffData";

export interface ArchiveData {
    name:string
    date:string
    image:string

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