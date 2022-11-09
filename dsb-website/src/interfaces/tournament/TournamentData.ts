export interface TournamentData {
    uuid:string
    name:string
    publicUrl:string
    participants:ParticipantData[]
    matches:MatchData[]
}

export interface ParticipantData {
    id:number
    name:string
    wins:number
    matchesPlayed:number
    roundsWon:number
    roundsLost:number
    difference:number
}

export interface MatchData {
    id:number
    participant1Id:number
    participant2Id:number
    score1:number
    score2:number
}