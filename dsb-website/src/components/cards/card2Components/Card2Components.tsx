import "./card2Style.sass"
import {Component} from "react";
import {getRoleNameLocalized, SocialMediaData, StaffMember} from "../../../interfaces/StaffData";

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
                            <table className="stats-table">
                                <thead className="stats-header">
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td>G-V-U</td>
                                    <td>Pkt.</td>
                                    <td>ΔPkt.</td>
                                </tr>
                                </thead>
                                <tbody>
                                {tournament.participants.map((participant, index) => (
                                    <tr key={participant.id} className="division-team-stats">
                                        <td>{index+1}</td>
                                        <td className="text-left">{trimTeamname(participant.name)}</td>
                                        <td>{participant.wins}-{participant.matchesPlayed-participant.wins}-0</td>
                                        <td>{participant.roundsWon}</td>
                                        <td>{participant.difference}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </a>

        </div>
    )
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
        return (
            <div className={`card2-container ${!SHOW_SOCIALS_IN_BOX ? "card2-smaller" : ""}`}>
                <div className="card2-hook small" style={{
                    background: `${staffMember.color} repeating-linear-gradient(225deg, rgb(38 38 38 / 0%), rgb(38 38 38 / 0%) 1.5rem, rgb(0 0 0 / 10%) 0px, rgb(0 0 0 / 10%) 3rem)`,
                    backgroundPosition: `0.25rem 0`
                }}></div>
                <div className="card2"
                     style={{background: `${staffMember.color} repeating-linear-gradient(225deg, rgb(38 38 38 / 0%), rgb(38 38 38 / 0%) 1.5rem, rgb(0 0 0 / 10%) 0px, rgb(0 0 0 / 10%) 3rem)`}}>
                    <Card2Header staffMember={staffMember}/>
                    <div className="content-container">
                        <div className={`content ${staffMember.socialMedias.length > 0 && SHOW_SOCIALS_IN_BOX ? "content-primary" : "content-full"}`}>
                            <p className="content-headline">Tätigkeiten</p>
                            <div className="content-main">
                                {staffMember.roles.map(role =>
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
                    <a key={social.name} className="social-link" href={social.url} target="_blank">
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
                    <img className="user-image" src={staffMember.profileImageUrl} alt=""/>
                    <p className="user-name">{staffMember.name}</p>
                    <SocialMediaInline socialMedias={staffMember.socialMedias}/>
                </div>
            </div>
        )
    }
}