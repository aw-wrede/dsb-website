import './joinTeamBannerStyle.sass'
import {TEAM_APPLICATION_MAIL_ADDRESS} from "../../../definitions/constants";
export default function JoinTeamBannerComponent() {
    return(
        <div className="joinTeamBannerContainer">
            <h1>Wir suchen dich!</h1>
            <p>Du möchtest Teil der DSB werden?</p>
            <p>Dann bewirb dich jetzt als Streamer, Kommentator oder Cutter an <a className="team-join-mail" href={`mailto:${TEAM_APPLICATION_MAIL_ADDRESS}`}>{TEAM_APPLICATION_MAIL_ADDRESS}</a>!</p>
            <p>Initiativbewerbungen sind ebenfalls erwünscht!</p>
        </div>
    )
}