export interface TournamentData {
    uuid:string
    name:string
    publicUrl:string
    isGroup:boolean
    isInFinals:boolean
    teamsPerGroupEnterFinals:number
    groupsAmount:number
    participants:ParticipantData[]
    matches:MatchData[]
    groupsParticipantIds:number[][]
    groupParticipants:ParticipantData[][]
    finalMatches:MatchData[][]
    /*
        size 1: finals[1]
        size 2: finals[1], 3rd[1]
        size 3: semi-finals[2], finals[1], 3rd[1]
        size 4: quarter-finals[4], semi-finals[2], finals[1], 3rd[1]
        ...

     */
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