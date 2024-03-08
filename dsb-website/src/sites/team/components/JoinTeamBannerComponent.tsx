import './joinTeamBannerStyle.sass'
export default function JoinTeamBannerComponent() {
    return(
        <div className="joinTeamBannerContainer">
            <h1>Wir suchen dich!</h1>
            <p>Du möchtest Teil der DSB werden?</p>
            <p>Dann bewirb dich jetzt als Streamer, Kommentator oder Cutter an <a className="team-join-mail" href="mailto:deutschesplatbundesliga@gmail.com">deutschesplatbundesliga@gmail.com</a>!</p>
            <p>Initiativbewerbungen sind ebenfalls erwünscht!</p>
        </div>
    )
}