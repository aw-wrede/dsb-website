import "./card2Style.sass"
import {Component} from "react";
import {getRoleNameLocalized, getStaffColor, SocialMediaData, StaffMember} from "../../../interfaces/StaffData";
import {MatchData, TournamentData} from "../../../interfaces/tournament/TournamentData";

const SHOW_SOCIALS_IN_HEADER = false
const SHOW_SOCIALS_IN_BOX = true

/*
        card hook backgroundPosition:
        size    pos
        3rem    1.25rem 0
        4rem    0.25rem
 */

export function Card2DivisionComponent({tournament, color}) {
    return (
        <div className="card2-container wider">
            <div className="card2-hook small" style={{
                background: `${color} repeating-linear-gradient(225deg, rgb(38 38 38 / 0%), rgb(38 38 38 / 0%) 1.5rem, rgb(0 0 0 / 10%) 0px, rgb(0 0 0 / 10%) 3rem)`,
                backgroundPosition: `0.25rem 0`
            }}></div>
            <a href={`https://challonge.com/${tournament.publicUrl}`} target="_blank">
                <div className="card2"
                     style={{background: `${color} repeating-linear-gradient(225deg, rgb(38 38 38 / 0%), rgb(38 38 38 / 0%) 1.5rem, rgb(0 0 0 / 10%) 0px, rgb(0 0 0 / 10%) 3rem)`}}>
                    <div className="content-container no-bg">
                        <div className="content">
                            <img className="header-text-bg" src="/images/splat.svg" alt=""/>
                            <div className="content-header">
                                <p className="header-text">{tournament.name.replace(/^Season \d /, "").replace(/^DSB Season \d /, "")}</p>

                            </div>
                            <DivisionTable tournament={tournament} />
                        </div>
                    </div>
                </div>
            </a>

        </div>
    )
}

const DivisionTableHeader = () => {
    return(
        <thead className="stats-header">
            <tr>
                <td></td>
                <td></td>
                <td>G-V-U</td>
                <td>Pkt.</td>
                <td>ΔPkt.</td>
            </tr>
        </thead>
    )
}

const DivisionTableBody = ({participants}) => {
    return (
        <tbody>
        {participants.map((participant, index) => (
            <tr key={participant.id} className="division-team-stats">
                <td>{index + 1}</td>
                <td className="text-left">{trimTeamname(participant.name)}</td>
                <td>{participant.wins}-{participant.matchesPlayed - participant.wins}-0</td>
                <td>{participant.roundsWon}</td>
                <td>{participant.difference}</td>
            </tr>
        ))}
        </tbody>
    )
}

class FinalsTree extends Component<{ tournament: TournamentData }> {
    render() {
        let hasMatch3rdPlace = false
        let thirdMatch:MatchData
        let {tournament} = this.props;
        let stepsInFinals = tournament.groupsAmount * tournament.teamsPerGroupEnterFinals / 2
        if(stepsInFinals > 1) {
            stepsInFinals++
            hasMatch3rdPlace = true
        }

        let finalMatches: MatchData[][] = []

        let matchesInCurrentStep
        for (let i = 0; i < stepsInFinals; i++) {
            if(stepsInFinals > 1) {
                //finals has a match for 3rd place (placed at the end of array)
                if(stepsInFinals-i-2 < 0)
                    matchesInCurrentStep = 1;
                else
                    matchesInCurrentStep = Math.pow(2, stepsInFinals-i-2)
            } else {
                matchesInCurrentStep = 1
            }

            const receivedMatchesData = tournament.finalMatches[i]
            let array:MatchData[] = []
            for(let j = 0; j < matchesInCurrentStep; j++) {
                if(receivedMatchesData == null || receivedMatchesData[j] == null) {
                    array.push({
                        id: 0,
                        participant1Id: 0,
                        participant2Id: 0,
                        score1: 0,
                        score2: 0
                    })
                } else {
                    finalMatches[i][j] = receivedMatchesData[j]
                }
            }

            finalMatches.push(array)
        }

        if(hasMatch3rdPlace) {
            thirdMatch = finalMatches[stepsInFinals-1][0]
            finalMatches.pop() //remove last match from list, because it is match for 3rd place
        }

        return (
            <div>
                <div className="division-finals-container">
                    {finalMatches.map((matches, index1) => (
                        <FinalsMatchesComponent tournament={tournament} matches={matches} index={index1} has3rdPlaceMatch={hasMatch3rdPlace} stepsInFinals={stepsInFinals} thirdPlaceMatch={thirdMatch} />
                    ))}
                </div>
            </div>

        )
    }
}

class FinalsMatchesComponent extends Component<{ tournament: TournamentData, matches: MatchData[], index: number, has3rdPlaceMatch: boolean, stepsInFinals: number, thirdPlaceMatch: MatchData|null }> {
    render() {
        let {tournament, matches, index, has3rdPlaceMatch, stepsInFinals, thirdPlaceMatch} = this.props;

        let render3rdPlaceMatch = false
        if (has3rdPlaceMatch) {
            if (index === stepsInFinals-2)
                render3rdPlaceMatch = true;
        }

        return (
            <div className="final-matches-container">
                <div>
                    <p className="final-matches-header">{getFinalsStageName(has3rdPlaceMatch ? stepsInFinals - index -1 : stepsInFinals - index)}</p>
                    {matches.map((match, index2) => (
                        <div className="finals-match">
                            <div className="match-body">
                                <div className="match-teams">
                                    <p>{match.participant1Id <= 0 ? "TEAM" : getTeamNameFromId(tournament, match.participant1Id)}</p>
                                    <p>{match.participant2Id <= 0 ? "TEAM" : getTeamNameFromId(tournament, match.participant2Id)}</p>
                                </div>
                                <div className="finals-score">
                                    <p>{match.participant1Id <= 0 ? "0" : match.score1}</p>
                                    <p>{match.participant1Id <= 0 ? "0" : match.score2}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {render3rdPlaceMatch &&
                    <div>
                        <p className="final-matches-header">{getFinalsStageName(0)}</p>
                        <div className="finals-match">
                            <div className="match-body">
                                <div className="match-teams">
                                    <p>{thirdPlaceMatch!.participant1Id <= 0 ? "TEAM" : getTeamNameFromId(tournament, thirdPlaceMatch!.participant1Id)}</p>
                                    <p>{thirdPlaceMatch!.participant2Id <= 0 ? "TEAM" : getTeamNameFromId(tournament, thirdPlaceMatch!.participant2Id)}</p>
                                </div>
                                <div className="finals-score">
                                    <p>{thirdPlaceMatch!.participant1Id <= 0 ? "0" : thirdPlaceMatch!.score1}</p>
                                    <p>{thirdPlaceMatch!.participant1Id <= 0 ? "0" : thirdPlaceMatch!.score2}</p>
                                </div>
                            </div>
                        </div>
                    </div>}
            </div>


        )
    }
}

function getTeamNameFromId(tournament:TournamentData, id:number):string|null {
    for(let i = 0; i < tournament.participants.length; i++) {
        const p = tournament.participants[i]
        if(p.id === id)
            return p.name
    }
    return null
}

function getFinalsStageName(stage:number) {
    switch (stage) {
        case 0: return "Um Platz 3"
        case 1: return "Finale"
        case 2: return "Halbfinale"
        case 3: return "Viertelfinale"
        case 4: return "Achtelfinale"
        case 5: return "Sechszehntelfinals"
    }
}

class DivisionTable extends Component<{ tournament: TournamentData }> {
    render() {
        let {tournament} = this.props;
        if (!tournament.isGroup) {
            //tournament is not group based
            return (
                <table className="stats-table">
                    <DivisionTableHeader />
                    <DivisionTableBody participants={tournament.participants} />
                </table>

            )
        }

        //tournament is group based


        return (
            <div className="tables-container group-division">
                {tournament.isInFinals && <div>
                    <FinalsTree tournament={tournament} />
                </div>}
                {tournament.groupParticipants.map((participants, index) => (
                    <div className="table-container">
                        <div className="c-header">
                            <p className="group-name">{getGroupName(index)}</p>
                        </div>
                        <table className="stats-table">
                            <DivisionTableHeader />
                            <DivisionTableBody participants={participants} />
                        </table>
                    </div>

                ))}
            </div>
        )
    }
}

function getGroupName(index:number) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if(index >= alphabet.length) return `Gruppe ${getGroupName(index-alphabet.length)}` //TODO better handling
    return `Gruppe ${alphabet[index]}`
}

function trimTeamname(name:string) {
    const maxLength = 24
    if(name.length <= maxLength) {
        return name
    }

    return `${name.substring(0, maxLength)}...`

}

export class Card2TeamComponent extends Component<{ staffMember: StaffMember }> {
    render() {
        let {staffMember} = this.props;
        const color = getStaffColor(staffMember)
        return (
            <div className={`card2-container ${!SHOW_SOCIALS_IN_BOX ? "card2-smaller" : ""}`}>
                <div className="card2-hook small" style={{
                    background: `${color} repeating-linear-gradient(225deg, rgb(38 38 38 / 0%), rgb(38 38 38 / 0%) 1.5rem, rgb(0 0 0 / 10%) 0px, rgb(0 0 0 / 10%) 3rem)`,
                    backgroundPosition: `0.25rem 0`
                }}></div>
                <div className="card2"
                     style={{background: `${color} repeating-linear-gradient(225deg, rgb(38 38 38 / 0%), rgb(38 38 38 / 0%) 1.5rem, rgb(0 0 0 / 10%) 0px, rgb(0 0 0 / 10%) 3rem)`}}>
                    <Card2Header staffMember={staffMember}/>
                    <div className="content-container">
                        <div className={`content ${staffMember.socialMedias.length > 0 && SHOW_SOCIALS_IN_BOX ? "content-primary" : "content-full"}`}>
                            <p className="content-headline">Tätigkeiten</p>
                            <div className="content-main">
                                {staffMember.roles
                                    .sort((a, b) => a - b)
                                    .map(role =>
                                        (<p key={role}>{getRoleNameLocalized(role)}</p>))
                                }
                            </div>
                        </div>
                        <SocialMediaBox socialMedias={staffMember.socialMedias} />
                    </div>
                </div>
            </div>
        )
    }
}

class SocialMediaInline extends Component<{ socialMedias: SocialMediaData[] }> {
    render() {
        let {socialMedias} = this.props;
        if(!SHOW_SOCIALS_IN_HEADER) return (<div className="hidden"></div>)
        return (
            <div className="user-socials">
                {socialMedias.map(social => (
                    <a key={social.name} className="social-link" href={social.url} target="_blank" rel="noreferrer">
                        <img className="social" src={`/logos/${social.icon}`} alt={social.name}/>
                    </a>
                ))}
            </div>
        )
    }
}

class SocialMediaBox extends Component<{ socialMedias: SocialMediaData[] }> {
    render() {
        let {socialMedias} = this.props;
        if (socialMedias.length === 0 || !SHOW_SOCIALS_IN_BOX) return (<div className="content" style={{display: "none"}}></div>)
        return (
            <div className="content content-secondary">
                <p className="content-headline">Social Media</p>
                <div className="user-socials">
                    {socialMedias.map(social => (
                        <a key={social.name} className="social-link" href={social.url} target="_blank">
                            <img className="social" src={`/logos/${social.icon}`} alt={social.name}/>
                        </a>
                    ))}
                </div>
            </div>
        )
    }
}

class Card2Header extends Component<{ staffMember: StaffMember }> {
    render() {
        let {staffMember} = this.props;
        return (
            <div className="card2-header">
                <div className="user-info">
                    {staffMember.profileImageUrl != null &&
                        <img className="user-image" src={staffMember.profileImageUrl} alt=""/>}
                    <p className="user-name">{staffMember.name}</p>
                    <SocialMediaInline socialMedias={staffMember.socialMedias}/>
                </div>
            </div>
        )
    }
}