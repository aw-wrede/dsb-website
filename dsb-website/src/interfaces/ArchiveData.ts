export interface ArchiveData {
    name:string
    date:string
    image:string

}

export interface ArchiveSeason extends ArchiveData{
    divisions:Division[]
}

export interface ArchiveTourney extends ArchiveData {
    brackets:ArchiveBracket[]
}

export interface ArchiveBracket {
    name:string|null
    winners:string[]
}

export interface Division {
    name:string
    url:string
}